import React from "react";
import '../../styles/Global.css'
import styles from './Perfil.module.css'
import Image from 'next/image';


const Perfil = () => {
  return(
    <>
     <div className={styles.container}>
     <div className={styles.container1}>
        <div className={styles.containerCadastro}>
        <h1 className={styles.title}>Perfil</h1>
          <div className={styles.inputContainer}>
            <h2 className={styles.nomes}>Nome</h2>
            <input className={styles.input} placeholder='Nome do usuário' type='text' />
            <h2 className={styles.nomes}>Senha</h2>
            <input className={styles.input} placeholder='Senha do usuário' type='text' />
            <h2 className={styles.nomes}>Email</h2>
            <h2 className={styles.emailUsuario}>Email do usuário</h2>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.button}>Salvar</button>
            </div>
          </div>
          <div className={styles.item1}>
        <Image src="/FotoPerfil.svg" width={500} height={500} alt="FotoPerfil" className={styles.img} />
      </div>
        </div>
      </div>
    </>
  )
}

export default Perfil
