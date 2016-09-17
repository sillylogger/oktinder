import React from "react"
import {MatchesItem} from "./item/item.js"
import styles from "./matches.css"

export class Matches extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      matches: this.matchesByPingTime(this.props.data).slice(0, 50),
      activeMatchIndex: -1
    };
  }

  componentDidMount() {
    document.getElementById('key').focus();
  }

  setActiveMatch(match) {
    this.setState({
      activeMatchIndex: match.props.index
    });
  }

  //
  // Trying to navigate with the up and down arrow isn't working so well..
  // 
  // onKeyUp={this.navigateActiveMatch.bind(this)}
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

  render() {
    let items = this.state.matches.map(function(itemData, index){
      return <MatchesItem key={index}
                          data={itemData}
                          index={index}
                          active={this.state.activeMatchIndex === index}
                          setActiveMatch={this.setActiveMatch.bind(this)} />
    }.bind(this))

    return (
      <div className={styles.matches}>
        {items}
        <input type="text" id="key" className={styles.key} />
      </div>
    )
  }

  matchesByPingTime(data) {
    return data.filter(function(match) {
      return match.person !== undefined;
    }).sort(function(a,b) {
      return (new Date(b.person.ping_time)) - (new Date(a.person.ping_time));
    });
  }
}
