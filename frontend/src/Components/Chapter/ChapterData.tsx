import React from 'react';
import styles from './chapter.module.css';
import '../../styles/Global.css'
import Link from 'next/link';

type ChapterDataProps = {
  title: string;
  subtitle: string;
  paragraphs: string[];
};

const ChapterData: React.FC<ChapterDataProps> = ({ title, subtitle, paragraphs }) => {
  return (
    <div className={styles.ChapterContainer}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
      <div className={styles.voltarContainer}>
        <Link href="/Library">
      <button className={styles.VoltarButton}>Voltar</button>
      </Link>
      </div>
      <div className={styles.ChapterCard}>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={styles.text}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ChapterData;
