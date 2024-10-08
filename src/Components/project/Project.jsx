import React from "react";
import styles from "./project.module.css"

const Project = () => {
  return(
  <>
  <div className={styles.container}>

            <div className={styles.containerProject}>
            <h1 className={styles.title}>Grupos</h1>
                <ol className={styles.textGroups}>
                    <li>Desenvolvimento de uma plataforma integrada para análise dos níveis de ruído rodoviário utilizando inteligência artificial</li>
                    <p> (Pedro Henrique Nunes Zanette, Vítor Kurth Vasconcellos e Sara Rotenski Pereira)</p>
                    <li>Análise do tempo de reverberação em auditórios</li>
                    <p> (Gabriel Pelizzaro Pereira, Pedro Henrique Nunes Zanette e Vítor Kurth Vasconcellos)</p>
                    <li>Análise da qualidade sonora em salas de aula: Estudo preliminar do tempo de reverberação</li>
                    <p>(Lucas Nascimento Garcez, Vitor Cunha de Souza, Tiago Roldão Simon)</p>
                    <li>Análise do isolamento ao ruído aéreo entre salas de aula</li>
                    <p>(Raul Vicente Gelsleichter, Sara Rotenski Pereira, Zyon Francisco Gomes Machado)</p>
                    <li>Análise do isolamento do ruído de impacto entre pisos</li>
                    <p>(Bibiana Engel Ribeiro, Carolina Vasco da Silva e Larissa Miranda Medeiros)</p>
                </ol>
                <h2 className={styles.subtitle}>Nosso Projeto</h2>
                <div className={styles.cardProject}>
                    <p className={styles.titleProject}>Desenvolvimento de uma plataforma calculadora para análise dos níveis de ruído rodoviário</p>

                        <p className={styles.textProject}>Essa plataforma se propõe a ser uma ferramenta eficaz para avaliar e mitigar os efeitos sonoros decorrentes do fluxo rodoviário. A metodologia empregada inclui a integração de dados geoespaciais, informações sobre as características das rodovias, dados de tráfego de veículos e modelos analíticos para permitir um cálculo mais preciso dos níveis de ruído em decibéis (dB) em diversos pontos ao longo das vias. Cabe ressaltar que o combate ao ruído rodoviário é um desafio global que demanda abordagens complexas e o uso de novas tecnologias para minimizar seus impactos negativos. A diversidade desses modelos e a apresentação dos conteúdos em pauta representam uma abordagem abrangente para enfrentar o desafio em questão, tornando possível a adaptação às necessidades específicas de diferentes situações e regiões e contribuindo para uma compreensão mais ampla e eficaz do tema. <span>Leia nosso artigo científico!</span>
                        </p>

                        <div className={styles.textProject}>
                            <p>Essa plataforma se propõe a ser uma ferramenta eficaz para avaliar e mitigar os efeitos sonoros decorrentes do fluxo rodoviário. </p>
                            <p>A metodologia empregada inclui a integração de dados geoespaciais, informações sobre as características das rodovias, dados de tráfego de veículos e modelos analíticos para permitir um cálculo mais preciso dos níveis de ruído em decibéis (dB) em diversos pontos ao longo das vias.</p>
                            <p>Cabe ressaltar que o combate ao ruído rodoviário é um desafio global que demanda abordagens complexas e o uso de novas tecnologias para minimizar seus impactos negativos.</p>
                            <p> A diversidade desses modelos e a apresentação dos conteúdos em pauta representam uma abordagem abrangente para enfrentar o desafio em questão, tornando possível a adaptação às necessidades específicas de diferentes situações e regiões e contribuindo para uma compreensão mais ampla e eficaz do tema. <span>Leia nosso artigo científico!</span>
                            </p>
                        </div>


                    <div className={styles.moreInfo}>
                        <a href='https://github.com/anabmartins/IC-Website-2023' target='_blank' rel="noreferrer">
                            <img src="./mdi_github.svg" />
                            Ver repositório</a>
                        <a className={styles.btnPDF}
                            href='./ArtigoIC.pdf'
                            download='Artigo.pdf'>
                            <p id='btnTxt'>Baixar PDF</p></a>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Project
