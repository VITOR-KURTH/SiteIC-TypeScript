"use client";

import React, { useState } from "react";
import styles from "./Integrantes.module.css";

interface Integrantes {
  id: number;
  nome: string;
  funcao: string;
  foto: string;
}

const grupos = [
  {
    nome: "Orientador",
    pdf: null, // Orientador não possui PDF
    integrantes: [
      {
        id: 1,
        nome: "Wagner de Souza Santos",
        funcao: "Orientador",
        foto: "/Wawa.jpg",
      },
    ],
  },
  {
    nome: "Grupo 1: DESENVOLVIMENTO DE UMA PLATAFORMA INTEGRADA PARA ANÁLISE DOS NÍVEIS DE RUÍDO RODOVIÁRIO",
    pdf: "/IA.pdf",
    integrantes: [
      {
        id: 2,
        nome: "Pedro Henrique Nunes Zanette",
        funcao: "Desenvolvedor",
        foto: "/Pedro.jpg",
      },
      {
        id: 3,
        nome: "Sara Rotenski Pereira",
        funcao: "Desenvolvedora",
        foto: "/Sara.jpg",
      },
      {
        id: 4,
        nome: "Vítor Kurth Vasconcellos Ferreira",
        funcao: "Desenvolvedor",
        foto: "/VitorK.jpg",
      },
    ],
  },
  {
    nome: "Grupo 2: ANÁLISE DO TEMPO DE REVERBERAÇÃO EM AUDITÓRIOS COM USO ESCOLAR E PROPOSTA DE INTERVENÇÃO",
    pdf: "/Reverberação.pdf",
    integrantes: [
      {
        id: 5,
        nome: "Vitor Cunha de Souza",
        funcao: "Pesquisador",
        foto: "/VitorC.jpg",
      },
      {
        id: 6,
        nome: "Maria Eduarda dos Santos Bernardo",
        funcao: "Pesquisadora",
        foto: "/Maria.jpg",
      },
      {
        id: 7,
        nome: "Larissa Miranda Medeiros",
        funcao: "Pesquisadora",
        foto: "/Larissa.jpg",
      },
    ],
  },
  {
    nome: "Grupo 3: ANÁLISE DO ISOLAMENTO AO RUÍDO DE IMPACTO EM PISOS DE EDIFICAÇÕES COM USO ESCOLAR",
    pdf: "/Impacto.pdf",
    integrantes: [
      {
        id: 8,
        nome: "Lucas Nascimento Garcez",
        funcao: "Pesquisador",
        foto: "/Lucas.jpg",
      },
      {
        id: 9,
        nome: "Bibiana Engel Ribeiro",
        funcao: "Pesquisadora",
        foto: "/Bibiana.jpg",
      },
    ],
  },
  {
    nome: "Grupo 4: ANÁLISE DE TRANSMISSÃO DO RUÍDO AÉREO ENTRE PAREDES DE UMA EDIFICAÇÃO COM USO ESCOLAR.",
    pdf: "/RuidoÁereo.pdf",
    integrantes: [
      {
        id: 10,
        nome: "Zyon Francisco Machado",
        funcao: "Pesquisador",
        foto: "/Zyon.jpg",
      },
      {
        id: 11,
        nome: "Luísa Fernanda Cacilha",
        funcao: "Pesquisadora",
        foto: "/Luisa.jpg",
      },
    ],
  },
];

const Integrantes: React.FC = () => {
  const [aberto, setAberto] = useState<{ [key: string]: boolean }>({});

  const alternarGrupo = (nome: string) => {
    setAberto((prevState) => ({ ...prevState, [nome]: !prevState[nome] }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Grupos e integrantes</h1>
      <div className={styles.caps}>
        {grupos.map((grupo) => (
          <div key={grupo.nome} className={styles.grupo}>
            <button
              className={styles.toggleButton}
              onClick={() => alternarGrupo(grupo.nome)}
            >
              {grupo.nome} {aberto[grupo.nome] ? "▲" : "▼"}
            </button>
            {aberto[grupo.nome] && (
              <div>
                <div className={styles.grid}>
                  {grupo.integrantes.map((integrante) => (
                    <div key={integrante.id} className={styles.card}>
                      <img
                        src={integrante.foto}
                        alt={`Foto de ${integrante.nome}`}
                        className={styles.foto}
                      />
                      <div className={styles.info}>
                        <h3 className={styles.nome}>{integrante.nome}</h3>
                        <p className={styles.funcao}>{integrante.funcao}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {grupo.pdf && (
                  <div className={styles.downloadButtonContainer}>
                    <a
                      href={grupo.pdf}
                      download
                      className={styles.downloadButton}
                    >
                      Baixar PDF
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Integrantes;
