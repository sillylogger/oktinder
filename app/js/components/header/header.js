import React from "react"
import styles from "./header.css"

export class Header extends React.Component {
  render() {
    return (
      <div className={styles.header}>
        <h1 className={styles.title}>OkTinder</h1>
        <h3 className={styles.subtitle}>Pick one, don't die alone.</h3>
      </div>
    );
  }
}
