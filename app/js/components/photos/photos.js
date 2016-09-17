import React from "react"
import {Thumbnail} from "../thumbnail/thumbnail.js"
import styles from "./photos.css"

export class Photos extends React.Component {

  constructor(props, context) {
    super(props, context);


    this.state = {
      photos: this.photosWithSuccess(this.props.data)
    };
  }

  render() {
    let images = this.state.photos.map(function(photoData, index){
      return <Thumbnail key={index} data={photoData} />
    });

    return <div className={styles.photos}>{images}</div>;
  }

  photosWithSuccess(data) {
    let unflattenedPhotos = data.filter(function(match) {
      return match.person !== undefined;
    }).map(function(match) {
      return match.person.photos;
    });

    let photosWithSuccess = [].concat.apply([], unflattenedPhotos).filter(function(photo) {
      return photo.successRate !== undefined;
    });

    let sortedPhotos = photosWithSuccess.sort(function(a,b) {
      return parseFloat(b.successRate) - parseFloat(a.successRate);
    });

    return sortedPhotos;
  }
}
