import React from "react";
import styles from './IA.module.css'

const IA = () => {
  return(
    <>
    <div className={styles.container}></div>
    <div className={styles.containerIA}>
    <h1 className={styles.title1}>Inteligência Artificial</h1>
    <div className={styles.containerVideo}>
      <div className={styles.item1}>
      <p className={styles.title2}>Arraste e solte o video aqui! ou clique abaixo</p>
      <button className={styles.btnVideo}>Enviar</button>
      </div>
    </div>
    </div>
    </>
  )
}

export default IA
