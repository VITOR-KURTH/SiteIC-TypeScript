import React from 'react';
import styles from './page.module.css';
import '../../styles/Global.css';
import Image from 'next/image';
import Link from 'next/link';

const Cadastro = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item1}>
        <Image src="/Rocket.svg" width={500} height={500} alt="megafone" className={styles.img} />
      </div>
      <div className={styles.container1}>
        <div className={styles.containerCadastro}>
        <h1 className={styles.title}>Login</h1>
          <div className={styles.inputContainer}>
            <input className={styles.input} placeholder='Usuário ou Email' type='text' />
            <input className={styles.input} placeholder='Senha' type='text' />
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.button}>Entrar</button>
            <Link href="/Cadastro" passHref>
          <button className={styles.button}>Cadastrar</button>
        </Link>          </div>
          </div>
        </div>
      </div>
  );
};

export default Cadastro;
