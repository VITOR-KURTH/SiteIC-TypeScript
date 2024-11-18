// Chapter.tsx
import React from 'react';
import styles from './card.module.css';

type ChapterProps = {
  title: string;
  subtitle: string;
};

const Chapter: React.FC<ChapterProps> = ({ title, subtitle }) => {
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
