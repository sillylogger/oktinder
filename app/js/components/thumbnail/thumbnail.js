import React from "react"
import styles from "./thumbnail.css"

export class Thumbnail extends React.Component {

  /*
   * Photo:
   *
   {
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
   }
  */

  openLightboxTo(e) {
    e.preventDefault();
    this.props.openLightboxTo(this.props.index);
  }

  render() {
    let photo = this.props.photo;
    let footer = null;

    if(photo.selectRate || photo.successRate) {
      footer = <footer className={styles.footer}>
                <span className={styles.selectRate}>select: {this.round(photo.selectRate)}</span>
                <span className={styles.successRate}>success: {this.round(photo.successRate)}</span>
              </footer>;
    }

    return (
          <figure className={styles.thumbnail}>
            <a href={photo.url} target="_blank" onClick={this.openLightboxTo.bind(this)}>
              <img src={photo.url} alt={photo.fileName} className={styles.img} />
            </a>
            {footer}
          </figure>
        );

  }

  round(value) {
    return Math.round(100 * value) / 100;
  }

}
