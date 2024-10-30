import React from 'react';
import styles from './page.module.css';
import '../../styles/Global.css';
import Image from 'next/image';
import Link from 'next/link';

const Cadastro = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item1}>
        <Image src="/megafone.svg" width={460} height={460} alt="megafone" className={styles.img} />
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
            <Link href="/Login" passHref>
          <button className={styles.button}>Login</button>
        </Link>
          </div>
          </div>
        </div>
      </div>
  );
};

export default Cadastro;
