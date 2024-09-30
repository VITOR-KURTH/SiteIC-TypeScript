import React from 'react';
import '../styles/Global.css';
import styles from '../CssModules/Home.module.css';
import Navbar from '../Components/navbar/Navbar';
import Image from 'next/image';
import Footer from '../Components/footer/footer';


function App(): JSX.Element {
  return (
    <div className="App">
      <Navbar />
      <div className={styles.container}>
        <div className={styles.item}>
          <h1 className={styles.title}>Iniciação Científica</h1>
          <p className={styles.desc}>
            Grupo de Iniciação Científica de Florianópolis, Santa Catarina,
            propondo ferramentas para análises em Acústica de forma acessível.
          </p>
          <button className={styles.button}>
            Saiba mais <span className={styles.arrow}>▶</span>
          </button>
        </div>
        <div className={styles.item}>
        <Image src="/Rocket.svg" alt="foguete" width={500} height={500} className={styles.img} />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
