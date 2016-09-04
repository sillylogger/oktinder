import React from "react"
import {MatchesItem} from "./item/item.js"
import styles from "./matches.css"

export class Matches extends React.Component {

  render() {
    let items = this.props.data.map(function(itemData, index){
      return <MatchesItem
              index={index}
              key={index}
              data={itemData}
              />
    })

    return (
      <div className={styles.thumbnails}>
        {items}
        <input type="text" id="key" className={styles.key} />
      </div>
      )
  }
}
