import React, { Component, Fragment } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
      isOpen: false,
      images: this.props.images
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.images !== nextProps.images) {
      this.setState({images: nextProps.images})
    }
  }

  render() { 
    const { photoIndex, isOpen, images } = this.state;
    
    return <Fragment>
      <div
        className="col-md-4 mb-4"
        onClick={() => this.setState({ isOpen: true })}
      >
        <img src={'images/' + this.props.image.filename} alt="" className="img-fluid single-img"/>
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => this.setState({ isOpen: false })}
          imageTitle={<p>{this.props.image.title}</p>}
          onMovePrevRequest={() =>
            this.setState({
              photoIndex: (photoIndex + images.length - 1) % images.length,
            })
          }
          onMoveNextRequest={() =>
            this.setState({
              photoIndex: (photoIndex + 1) % images.length,
            })
          }
        />
      )}
    </Fragment>
  }
}
 
export default Item;