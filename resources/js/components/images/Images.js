import React, { Component } from 'react';
import axios from 'axios';
import Item from './Item';

class Images extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			loading: true
		}
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
		const { images, loading } = this.state;
		return <div>
			<h3>I am Image Controller</h3>
			<p>Loading: {JSON.stringify(loading, undefined, 2)}</p>
			<p>Images: {JSON.stringify(images, undefined, 2)}</p>
			<div className="row mb-4">
				{[1,2,3,4,5,6,7,8,9].map((image, i) => <Item key={i} />)}
			</div>
		</div>
	}
}
 
export default Images;