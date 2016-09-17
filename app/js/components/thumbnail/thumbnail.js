import React from "react"
import styles from "./thumbnail.css"

export class Thumbnail extends React.Component {

  render() {
    let footer = null;

    if(this.props.data.selectRate || this.props.data.successRate) {
      footer = <footer className={styles.thumbnail_footer}>
                <span className={styles.thumbnail_selectRate}>Select: {this.round(this.props.data.selectRate)}</span>
                <span className={styles.thumbnail_successRate}>Success: {this.round(this.props.data.successRate)}</span>
              </footer>;
    }

    return (
          <figure className={styles.thumbnail}>
            <a href={this.props.data.url} target="_blank">
              <img src={this.props.data.url} alt={this.props.data.fileName} className={styles.thumbnail_img} />
            </a>
            {footer}
          </figure>
        );

  }

  round(value) {
    return Math.round(100 * value) / 100;
  }

}
