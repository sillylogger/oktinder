import React from "react"
import styles from "./content.css"
import {Photos} from "../photos/photos.js"
import {Matches} from "../matches/matches.js"

export class Content extends React.Component {

  constructor(props) {
    super(props)
  }

  // <Photos data={this.props.data.matches} />

  render() {
    return (
      <div className={styles.content}>
        <Matches data={this.props.data.matches} />
      </div>
    );
  }
}


