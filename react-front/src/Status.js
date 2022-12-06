import React from "react";
import styles from './Display.module.css'
import status from './assets/status.png'

export default function Status(props) {
  return (
    <div className={styles.transition}>
      <img
        className={styles.transitionimg}
        src={status}
        alt="Loading"
      />
      <h4 className={styles.transitiontext}>Fetching data</h4>
    </div>
  );
}