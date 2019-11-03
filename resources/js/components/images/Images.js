import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import Item from './Item';
import Upload from './Upload';
import Loader from 'react-loader-spinner';
import ReactPaginate from 'react-paginate';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class Images extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			count: 0,
			loading: true,
			modal: false,
			uploaded: '',
			pageCount: 1,
			currentPage: 0,
			paginationLoading: false,
			lightBoxImages: []
		}
	}

	handleModalOpen = () => {
		this.setState({modal: true})
	}

	handleModalClose = () => {
		this.setState({modal: false})
	}

	handleUploaded = (status) => {
		if(status === 'success') {
			return this.setState({loading: true}, () => {
				axios.get('/api/images').then(async ({data}) => {
					let pageCount = this.getPaginateRange(data.count);
					let lightBoxImages = await this.handleLightBoxImages(data.images);
					return this.setState({
						images: data.images,
						pageCount,
						loading: false,
						modal: false,
						uploaded: status,
						lightBoxImages
					});
				})
			});
		}
		this.setState({modal: false, uploaded: status})
	}

	handlePageClick = (data) => {
		const { currentPage } = this.state;
		let offset = 9;
		if(data.selected > currentPage) {
			offset = offset * (currentPage + 1)
		} else {
			offset = offset * (currentPage - 1)
		}
		this.setState({ currentPage: data.selected, paginationLoading: true }, () => {
			axios.get(`/api/images/next/${offset}`).then(async (res) => {
				let lightBoxImages = await this.handleLightBoxImages(res.data.images);
				this.setState({
					images: res.data.images,
					paginationLoading: false,
					lightBoxImages
				});
			})
		})
	}

	getPaginateRange = (count) => {
		let counter = 0
		for (let i = 9; i < count; i++) {
			if (i % 9 == 0) {
				counter++;
			}
		}
		return counter + 1;
	}

	handleLightBoxImages = async (images) => {
		let lightBoxImages = images.slice();
		lightBoxImages = await lightBoxImages.map((image) => {
			return base_url + '/images/' + image.filename;
		})
		return lightBoxImages;
	}

	componentDidMount() {
		axios.get('/api/images').then(async ({data}) => {
			let pageCount = this.getPaginateRange(data.count);
			let lightBoxImages = await this.handleLightBoxImages(data.images);
			this.setState({
				images: data.images,
				count: data.count,
				pageCount, loading: false,
				lightBoxImages
			});
		}).catch(exp => {
			console.log('exp: ', exp);
			this.setState({loading: false});
		})
	}

	render() { 
		const { images, loading, modal, lightBoxImages } = this.state;

		return <div>
			<div className="row p-3 justify-content-end">
				<button
					className="btn btn-outline-primary"
					onClick={this.handleModalOpen}
				>
					Upload Image
				</button>
				{modal && <Modal open={modal} onClose={this.handleModalClose} center>
					<Upload 
						uploaded={this.handleUploaded}
					/>
				</Modal>}				
			</div>
			{(loading) && <div className="row d-flex justify-content-center w-full nonagon-loader align-items-center">
				<Loader
					type="Grid"
					color="#00BFFF"
					height={100}
					width={100}
				/>
			</div>}
			<div className="row">
				{images.map((image, i) => <Item key={i} images={lightBoxImages} image={image} />)}
				{(!loading && !images.length) && <p className="not-found">No image found</p>}
			</div>
			{(!this.state.loading && (this.state.count > 9)) && <div className="row d-flex justify-content-center pl-3 pr-3 mb-2">
				<nav aria-label="Image Pagination">
					<ReactPaginate
						previousLabel={'previous'}
						nextLabel={'next'}
						breakLabel={'...'}
						breakClassName={'page-item'}
						breakLinkClassName={'page-link'}
						pageCount={this.state.pageCount}
						marginPagesDisplayed={2}
						pageRangeDisplayed={4}
						onPageChange={this.handlePageClick}
						previousClassName={'page-item'}
						nextClassName={'page-item'}
						previousLinkClassName={'page-link'}
						nextLinkClassName={'page-link'}
						pageClassName={'page-item'}
						pageLinkClassName={'page-link'}
						containerClassName={'pagination'}
						subContainerClassName={'pages pagination'}
						activeClassName={'active'}
					/>
				</nav>
			</div>}
			{/* <div className="row d-flex justify-content-center pl-3 pr-3 mb-2">
				<nav aria-label="Image Pagination">
					<ul className="pagination">
						<li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
						<li className="page-item active"><a className="page-link" href="#">1</a></li>
						<li className="page-item"><a className="page-link" href="#">2</a></li>
						<li className="page-item"><a className="page-link" href="#">3</a></li>
						<li className="page-item"><a className="page-link" href="#">Next</a></li>
					</ul>
				</nav>
			</div> */}
		</div>
	}
}
 
export default Images;