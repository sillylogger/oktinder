import React from "react"
import styles from "./content.css"
import {Matches} from "../matches/matches.js"

export class Content extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      activeItemIndex: -1
    }
  }

  setActiveItemIndex(activeItemIndex) {
    this.setState({
      activeItemIndex: activeItemIndex
    })
  }

  render() {
    let detail = '';

    return (
      <div className={styles.content}>
        <Matches
          data={this.props.data.matches}
          setActiveItemIndex={this.setActiveItemIndex.bind(this)} />
      </div>
    )
  }
}


