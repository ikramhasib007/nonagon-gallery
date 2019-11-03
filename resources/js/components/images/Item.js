import React, { Component, Fragment } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const lightBoxImages = [
  base_url + '/500/500/business/2',
  base_url + '/4000/3000',
  base_url + '/500/500/business/2',
  base_url + '/1500/1500',
];

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
      isOpen: false,
    }
  }
  render() { 
    const { photoIndex, isOpen } = this.state;
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
          imageTitle={<p>TItle Here</p>}
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