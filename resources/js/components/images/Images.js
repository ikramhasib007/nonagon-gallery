import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import Item from './Item';
import Upload from './Upload';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class Images extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			loading: true,
			modal: false,
			uploaded: ''
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
				axios.get('/api/images').then(({data}) => {
					return this.setState({images: data, loading: false, modal: false, uploaded: status});
				})
			});
		}
		this.setState({modal: false, uploaded: status})
	}

	componentDidMount() {
		axios.get('/api/images').then(({data}) => {
			this.setState({images: data, loading: false});
		}).catch(exp => {
			console.log('exp: ', exp);
			this.setState({loading: false});
		})
	}

	render() { 
		const { images, loading, modal } = this.state;
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
			{loading && <div className="row d-flex justify-content-center w-full nonagon-loader align-items-center">
				<Loader
					type="Grid"
					color="#00BFFF"
					height={100}
					width={100}
				/>
			</div>}
			<div className="row">
				{images.map((image, i) => <Item key={i} image={image} />)}
			</div>
			<div className="row d-flex justify-content-center pl-3 pr-3 mb-2">
				<nav aria-label="Image Pagination">
					<ul className="pagination">
						<li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
						<li className="page-item active"><a className="page-link" href="#">1</a></li>
						<li className="page-item"><a className="page-link" href="#">2</a></li>
						<li className="page-item"><a className="page-link" href="#">3</a></li>
						<li className="page-item"><a className="page-link" href="#">Next</a></li>
					</ul>
				</nav>
			</div>
		</div>
	}
}
 
export default Images;