
import '../../styles/Global.css';
import React from 'react'
import styles from "./page.module.css";
import Image from 'next/image'
import Navbar from '../../Components/navbar/Navbar';
import Project from '../../Components/project/Project';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iniciação Científica - Sobre',
  description: 'Site da iniciação Científica',

}

const About = () => {

return(

  <div className={styles.main}>
      <Navbar />
      <div className={styles.container}>
            <div className={styles.item1}>
              <Image src="/lamp.svg" width={500} height={500} alt="cubos" className={styles.img} />
            </div>
            <div className={styles.item1}>
              <h1 className={styles.title}>O que é a Iniciação Científica?</h1>
              <p className={styles.desc}>
                É um projeto organizado pela direção regional. São 10 grupos na
                Escola SESI, 3 Grupos na regional Sudeste e 10 estudantes por
                projeto.
              </p>
            </div>
          </div>
          <div className={styles.container2}>
            <div className={styles.item2}>
              <h1 className={styles.title}>Missão</h1>
              <p className={styles.desc}>
                Incentivar e desenvolver o protagonismo juvenil por meio da pesquisa
                para promover uma cultura científica e tecnológica.
              </p>
            </div>
            <div className={styles.item2}>
              <h1 className={styles.title}>Valores</h1>
              <p className={styles.desc}>
                Posicionar nacionalmente a Escola SESI como formadora de excelência
                em perspectivas científicas e tecnológicas em todas as áreas do
                conhecimento.
              </p>
            </div>
            <div className={styles.item3}>

              <h1 className={styles.title}>Organização</h1>
              <ul className={styles.desc}>
                <li>5 grupos com 3 estudantes.</li>
                <li>Auxílio de custo para os alunos.</li>
                <li>Carga horária semanal.</li>
                <li>Produção de artigo científico.</li>
              </ul>
            </div>
            <div className={styles.containerImg}>
            <Image src="/group.jpg" width={600} height={550} alt="grupo" className={styles.imgGroup} />
            </div>

          </div>
          <Project/>
        </div>

)



}

export default About
