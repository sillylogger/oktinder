import React from "react"
import {Thumbnail} from "../thumbnail/thumbnail.js"
import styles from "./photos.css"
import { PhotosStore } from "./../../stores/photos_store.js"

export class Photos extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      photos: PhotosStore.withSuccess(this.props.data)
    };
  }

  render() {
    let images = this.state.photos.map(function(photoData, index){
      return <Thumbnail key={index} data={photoData} />
    });

    return <div className={styles.photos}>{images}</div>;
  }

}
