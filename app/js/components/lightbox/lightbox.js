import React from "react"
import ReactImageLightbox from "react-image-lightbox"

export class Lightbox extends React.Component {

  /*
   * Photos:
   *
   [{
      "selectRate": 0.09638554216867468,
      "successRate": 0.3880597014925373,
      "fileName": "...jpg",
      "id": "...",
      "extension": "jpg",
      "processedFiles": [
        {
          "width": 640,
          "height": 640,
          "url": "http://images.gotinder.com/...jpg"
        }
        ...
      ],
      "url": "http://images.gotinder.com/...jpg"
   }]
  */

  constructor(props, context) {
    super(props, context);

    this.state = {
      index: props.index
    };
  }

  moveNext() {
    this.setState({ index: (this.state.index + 1) % this.props.photos.length });
  }

  movePrev() {
    this.setState({ index: (this.state.index + this.props.photos.length - 1) % this.props.photos.length });
  }

  render() {
    if(!this.props.active) {
      return null;
    }

    let photos = this.props.photos;

    let index = this.state.index;
    if(index === null) {
      index = this.props.index
    }

    let nextIndex = (index + 1) % photos.length;
    let prevIndex = (index + photos.length - 1) % photos.length;

    return (
      <ReactImageLightbox
            mainSrc={photos[index].url}
            nextSrc={photos[nextIndex].url}
            prevSrc={photos[prevIndex].url}
            onCloseRequest={this.props.closeLightbox}
            onMovePrevRequest={this.movePrev.bind(this)}
            onMoveNextRequest={this.moveNext.bind(this)} />
    );
  }

}

