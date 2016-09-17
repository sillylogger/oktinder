import React from "react"
import {Thumbnail} from "../../thumbnail/thumbnail.js"
import moment from "moment"
import styles from "./item.css"

export class MatchesItem extends React.Component {

  /*
  {
    "_id": "539555566c34b55231df839c",
    "closed": false,
    "common_friend_count": 0,
    "common_like_count": 0,
    "created_date": "2014-06-09T06:33:58.624Z",
    "dead": false,
    "last_activity_date": "2014-08-27T15:24:21.221Z",
    "message_count": 0,
    "messages": [
      {
        "_id": "53dde5c29fceea980afbadcc",
        "match_id": "539555566c34b55231df839c",
        "to": "530adcf86ae5b18b64000370",
        "from": "5393cb7eb367bafc7d39737f",
        "message": "So how was your lebaran?",
        "sent_date": "2014-08-03T07:33:22.957Z",
        "created_date": "2014-08-03T07:33:22.957Z",
        "timestamp": 1407051202957
      }
      ...
    ],
    "muted": false,
    "participants": [
      "530adcf86ae5b18b64000370"
    ],
    "pending": false,
    "not_following": {
      "5393cb7eb367bafc7d39737f": false,
      "530adcf86ae5b18b64000370": false
    },
    "is_super_like": false,
    "person": {
      "_id": "530adcf86ae5b18b64000370",
      "bio": "",
      "birth_date": "1995-09-07T05:49:22.527Z",
      "gender": 1,
      "name": "Nadya",
      "ping_time": "2016-08-21T08:04:56.712Z",
      "photos": [
        {
          "selectRate": 0.09638554216867468,
          "successRate": 0.3880597014925373,
          "fileName": "b7e8b99a-5194-490e-849b-0d9dc0cd5b37.jpg",
          "id": "b7e8b99a-5194-490e-849b-0d9dc0cd5b37",
          "extension": "jpg",
          "processedFiles": [
            {
              "width": 640,
              "height": 640,
              "url": "http://images.gotinder.com/530adcf86ae5b18b64000370/640x640_b7e8b99a-5194-490e-849b-0d9dc0cd5b37.jpg"
            }
            ...
          ],
          "url": "http://images.gotinder.com/530adcf86ae5b18b64000370/b7e8b99a-5194-490e-849b-0d9dc0cd5b37.jpg"
        }
      ],
      "badges": []
    }
  }
  */

  setActive() { }

  render() {
    let person = this.props.data.person;

    let thumbnails = person.photos.map(function(photo, index) {
      return <Thumbnail key={index} data={photo} />;
    });

    return (
      <article className={styles.match}>
        <header className={styles.header}>
          <h3 className={styles.name}>{person.name}</h3>
          <time className={styles.age} data={person.birth_date}>{moment(person.birth_date).fromNow(true)} old</time>
          <time className={styles.age} data={person.ping_time}>last pinged: {moment(person.ping_time).fromNow()}</time>
        </header>
        <pre className={styles.bio}>{person.bio}</pre>
        <section className={styles.thumbnails}>{thumbnails}</section>
      </article>
    );
  }

}
