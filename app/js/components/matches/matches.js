import React from "react"
import { MatchesItem } from "./item/item.js"
import styles from "./matches.css"
import { MatchesStore } from "./../../stores/matches_store.js"

export class Matches extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      matches: MatchesStore.sorted(this.props.data)
    };
  }

  //
  // Trying to navigate with the up and down arrow isn't working so well..
  //
  // componentDidMount() {
  //   document.getElementById('key').focus();
  // }
  //
  // navigateActiveMatch(e) {
  //   let index = this.state.activeMatchIndex;
  //
  //   if(index === -1) {
  //     index = 0;
  //   }
  //
  //   if(e.key === "ArrowUp" && index > 0) {
  //     index -= 1;
  //   } else if (e.key === "ArrowDown" && index < this.state.matches.length - 1) {
  //     index += 1;
  //   }
  //
  //   this.setState({
  //     activeMatchIndex: index
  //   });
  // }
  //
  // onKeyUp={this.navigateActiveMatch.bind(this)}
  //

  render() {
    let items = this.state.matches.map(function(itemData, index){
      return <MatchesItem key={index}
                          data={itemData}
                          index={index} />
    }.bind(this))

    return (
      <div className={styles.matches}>
        {items}
        <input type="text" id="key" className={styles.key} />
      </div>
    )
  }

}
