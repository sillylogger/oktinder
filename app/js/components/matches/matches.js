import React from "react"
import {MatchesItem} from "./item/item.js"
import styles from "./matches.css"

export class Matches extends React.Component {

  constructor(props, context) {
    super(props, context);

    let matches = this.props.data.filter(function(match) {
      return match.person !== undefined;
    }).sort(function(a,b) {
      return (new Date(b.person.ping_time)) - (new Date(a.person.ping_time));
    });

    this.state = {
      matches: matches // .slice(0, 50)
    };
  }

  render() {
    let items = this.state.matches.map(function(itemData, index){
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
