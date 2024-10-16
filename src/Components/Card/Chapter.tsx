import React from 'react';
import styles from './card.module.css'


// eslint-disable-next-line react/prop-types
const Chapter = ({ title, subtitle }) => {

  return (
    <div className={styles.card}>
        <div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
        </div>
    </div>
  );
};

export default Chapter;
