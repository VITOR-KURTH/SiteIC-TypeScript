import React from "react";
import styles from "./History.module.css"

const History = () => {
  return(
    <>
   <div className={styles.container}>
  <h1 className={styles.title}>História e Premiações</h1>
  <div className={styles.tempo}>
    <div className={styles.anoContainer}>
      <h2 className={styles.ano}>2022</h2>
      <p className={styles.desc}>Primeiro ano do projeto, artigo publicado em revista Qualis nível B1.</p>
    </div>
    <div className={styles.anoContainer}>
      <h2 className={styles.ano}>2023</h2>
      <p className={styles.desc}>Segundo ano do projeto, com segunda publicação de artigo em revista nacional, semi-finalistas na FEBRACE.</p>
    </div>
    <div className={styles.anoContainer}>
      <h2 className={styles.ano}>2024</h2>
      <p className={styles.desc}>Terceiro ano do projeto, participação na FEBIC com dois projetos premiados e finalistas na FENIC com um projeto selecionado.</p>
    </div>
  </div>
</div>

    </>
  )
}

export default History
