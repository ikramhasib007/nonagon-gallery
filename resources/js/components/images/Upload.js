import React, { Component } from 'react';
import axios from 'axios';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      image: null,
      sucess: false,
      errors: [],
      supported_mime : [
        'image/jpeg',
        'image/png',
        'image/gif',
      ]
    }
  }
  
  handleChange = (e) => {
    const { value, name } = e.target;
    let errors = this.state.errors.filter(error => error !== name);
    if (name === 'image' && (e.target.files || e.dataTransfer.files)) {
      let files = e.target.files || e.dataTransfer.files;
      if(this.state.supported_mime.includes(files[0].type))
      return this.setState(() => ({image: files[0], errors}));
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
    let formData = new FormData();
    let config = {
      headers: {
        authorization: 'token-here'
      }
    }
    formData.append("image", image);
    formData.append("title", title);
    axios.post("/api/images", formData, config).then(({data}) => {
      if(data === 'Successfully uploaded') {
        return this.setState({sucess: true}, () => {
          this.props.uploaded('success');
        })
      }
      return this.props.uploaded('fail');
    });
  }

  render() { 
    const { title, image, progress, errors, sucess } = this.state;
    return <div className="row m-4 d-flex flex-column align-items-center">
      <form
        className={`form-inline${((!!title && !!image) || errors.includes('title') || errors.includes('image')) ? ' was-validated' : ''}`}
        onSubmit={this.handleSubmit}
        noValidate
        encType="multipart/form-data"
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