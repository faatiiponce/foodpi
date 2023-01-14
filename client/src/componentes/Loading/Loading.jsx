import React from "react";
import styles from "../Home/Home.module.css";

export default function Loading() {
  return (
    <div id={styles.loading}>
      <img
        id={styles.imageLoading}
        src="https://i.pinimg.com/originals/ee/1d/08/ee1d081c5bdf966b058c1a6588e73e8a.gif"
        alt="loading"
      />
    </div>
  );
}
