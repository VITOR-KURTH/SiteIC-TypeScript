import React from 'react';
import styles from './page.module.css';
import '../../styles/Global.css';
import Image from 'next/image';

const Cadastro = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item1}>
        <Image src="/megafone.png" width={500} height={500} alt="megafone" className={styles.img} />
      </div>
      <div className={styles.container1}>
        <div className={styles.containerCadastro}>
        <h1 className={styles.title}>Cadastro</h1>
          <div className={styles.inputContainer}>
            <input className={styles.input} placeholder='Usuário' type='text' />
            <input className={styles.input} placeholder='Email' type='email' />
            <input className={styles.input} placeholder='Senha' type='password' />
            <input className={styles.input} placeholder='Repetir Senha' type='password' />
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.button}>Entrar</button>
            <button className={styles.button}>Cadastrar</button>
          </div>
          </div>
        </div>
      </div>
  );
};

export default Cadastro;
