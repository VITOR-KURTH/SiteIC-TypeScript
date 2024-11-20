import React from 'react';
import styles from '../CssModules/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';

function App(): JSX.Element {
  return (
    <div className="App">
      <div className={styles.container}>
        <div className={styles.item}>
          <h1 className={styles.title}>Iniciação Científica</h1>
          <p className={styles.desc}>
            Grupo de Iniciação Científica de Florianópolis, Santa Catarina,
            propondo ferramentas para análises em Acústica de forma acessível.
          </p>
          <Link href={'/About'}>
            <button className={styles.button}>
              Saiba mais ▶
            </button>
          </Link>
        </div>

        <div className={styles.item}>
          <Image src="/Rocket.svg" alt="foguete" width={500} height={500} className={styles.img} />
        </div>
      </div>
    </div>
  );
}

export default App;
