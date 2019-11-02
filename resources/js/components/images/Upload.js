import React, { Component } from 'react';
import FormData from 'form-data';
import axios from 'axios';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      image: null,
      progress: 0,
      errors: []
    }
  }
  
  handleChange = (e) => {
    const { value, name } = e.target;
    let errors = this.state.errors.filter(error => error !== name);
    if (name === 'image' && e.target.files[0]) {
      const image = e.target.files[0];
      return this.setState(() => ({image, errors}));
    } else {
      this.setState({[name]: value, errors});
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, image } = this.state;
    if(!title || !image) {
      return this.setState({errors: ['title', 'image']});
    }
    let data = new FormData();
    data.append('file', image, image.name);
    data.append('title', title);
    axios.post('/api/images', data, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      }
    }).then((res) => {
      console.log('res: ', res);

    })
  }

  render() { 
    const { title, image, progress, errors } = this.state;
    return <div className="row m-4 d-flex flex-column align-items-center">
      <div className="my-3">
        <progress value={progress} max="100"/>
      </div>
      <form
        className={`form-inline${((!!title && !!image) || errors.includes('title') || errors.includes('image')) ? ' was-validated' : ''}`}
        onSubmit={this.handleSubmit}
        noValidate
      >
        <div className="form-group">
          <label htmlFor="title" className="sr-only">Title</label>
          <input
            type="text"
            className={`form-control${(errors.includes('title') && !title) ? ' is-invalid' : ''}`}
            id="title"
            name="title"
            placeholder="Title"
            value={title}
            onChange={this.handleChange}
            required={(errors.includes('title') && !title) ? true : undefined}
          />
        </div>
        <div className="form-group mx-sm-3">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="image"
              name="image"
              onChange={this.handleChange}
              required={(errors.includes('image') && !image) ? true : undefined}
            />
            <label className="custom-file-label" htmlFor="image">Choose file...</label>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.handleSubmit}
        >
          Upload
        </button>
      </form>
    </div>
  }
}
 
export default Upload;