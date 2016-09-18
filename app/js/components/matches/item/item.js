import React from "react"
import moment from "moment"
import styles from "./item.css"

import {Thumbnail} from "../../thumbnail/thumbnail.js"
import {Lightbox} from "../../lightbox/lightbox.js"

export class MatchesItem extends React.Component {

  /*
   * Data:
   *
   {
      "_id": "ABC123",
      "closed": false,
      "common_friend_count": 0,
      "common_like_count": 0,
      "created_date": "2014-06-09T06:33:58.624Z",
      "dead": false,
      "last_activity_date": "2014-08-27T15:24:21.221Z",
      "message_count": 0,
      "messages": [
        {
          "_id": "ABC123",
          "match_id": "ABC123",
          "to": "ABC123",
          "from": "ABC123",
          "message": "So how was your lebaran?",
          "sent_date": "2014-08-03T07:33:22.957Z",
          "created_date": "2014-08-03T07:33:22.957Z",
          "timestamp": 1407051202957
        }
        ...
      ],
      "muted": false,
      "participants": [
        "ABC123"
      ],
      "pending": false,
      "not_following": {
        "ABC123": false,
        "ABC123": false
      },
      "is_super_like": false,
      "person": {
        "_id": "ABC123",
        "bio": "",
        "birth_date": "1995-09-07T05:49:22.527Z",
        "gender": 1,
        "name": "Person",
        "ping_time": "2016-08-21T08:04:56.712Z",
        "photos": [
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
        ],
        "badges": []
      }
   }
  */

  constructor(props, context) {
    super(props, context);

    this.state = {
      active: false,
      index: null
    };
  }

  openLightboxTo(index) {
    this.setState({
      active: true,
      index: index
    });
  }

  closeLightbox() {
    this.setState({
      active: false,
      index: null
    });
  }

  render() {
    let person = this.props.data.person;

    let thumbnails = person.photos.map(function(photo, index) {
      return <Thumbnail key={index} photo={photo} index={index} openLightboxTo={this.openLightboxTo.bind(this)} />;
    }.bind(this));

    return (
      <article className={styles.match}>
        <header className={styles.header}>
          <h3 className={styles.name}>{person.name}</h3>
          <time className={styles.age} data={person.birth_date}>{moment(person.birth_date).fromNow(true)} old</time>
          <time className={styles.age} data={person.ping_time}>last pinged: {moment(person.ping_time).fromNow()}</time>
        </header>
        <pre className={styles.bio}>
          {person.bio}
        </pre>
        <section className={styles.thumbnails}>
          {thumbnails}
        </section>
        <Lightbox className={styles.lightbox} photos={person.photos} index={this.state.index} active={this.state.active} closeLightbox={this.closeLightbox.bind(this)} />
      </article>
    );
  }

}
