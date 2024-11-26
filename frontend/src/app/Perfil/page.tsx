'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './Perfil.module.css';
import Image from 'next/image';

const Perfil = () => {
  const [usuario, setUsuario] = useState({ nome_usuario: '', email_usuario: '' });
  const router = useRouter();

  useEffect(() => {
    const fetchPerfil = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/Login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3333/perfil', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuario(response.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        alert('Erro ao carregar o perfil. Faça login novamente.');
        router.push('/Login');
      }
    };

    fetchPerfil();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/Login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.container1}>
        <div className={styles.containerCadastro}>
          <h1 className={styles.title}>Bem-vindo, {usuario.nome_usuario}!</h1>
          <div className={styles.infoBox}>
            <p className={styles.info}><strong>Nome:</strong> {usuario.nome_usuario || 'Carregando...'}</p>
            <p className={styles.info}><strong>Email:</strong> {usuario.email_usuario || 'Carregando...'}</p>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleLogout}>
              Sair
            </button>
          </div>
        </div>
        <div className={styles.item1}>
        <Image
            src="/FotoPerfil.svg"
            width={500}
            height={500}
            alt="Foto de Perfil"
            className={styles.img}
          />        </div>
      </div>
    </div>
  );
};

export default Perfil;
