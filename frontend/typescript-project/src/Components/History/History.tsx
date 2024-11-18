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
      <p className={styles.desc}>Primeiro ano do projeto, com participação de 15 estudantes</p>
    </div>
    <div className={styles.anoContainer}>
      <h2 className={styles.ano}>2023</h2>
      <p className={styles.desc}>Segundo ano do projeto, com publicação de artigo em revista nacional, finalistas na FEBRACE</p>
    </div>
    <div className={styles.anoContainer}>
      <h2 className={styles.ano}>2024</h2>
      <p className={styles.desc}>Terceiro ano do projeto, participação na FEBIC com dois projetos premiados</p>
    </div>
  </div>
</div>

    </>
  )
}

export default History
