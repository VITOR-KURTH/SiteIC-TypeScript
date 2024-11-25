'use client';
import React, { useEffect, useState } from 'react';
import '../../styles/Global.css';
import styles from './Perfil.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Perfil = () => {
  const [usuario, setUsuario] = useState({ nome: '', email: '' });
  const router = useRouter();

  useEffect(() => {
    const fetchPerfil = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        alert('Você precisa estar logado para acessar esta página.');
        router.push('/Login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3333/perfil', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsuario(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          alert('Sua sessão expirou. Por favor, faça login novamente.');
          router.push('/Login');
        } else {
          alert('Erro ao carregar perfil.');
        }
      }
    };

    fetchPerfil();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    alert('Você saiu da conta.');
    router.push('/Login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.container1}>
        <div className={styles.containerCadastro}>
          <h1 className={styles.title}>Perfil</h1>
          <div className={styles.inputContainer}>
            <h2 className={styles.nomes}>Nome</h2>
            <input
              className={styles.input}
              value={usuario.nome}
              readOnly
              type="text"
            />
            <h2 className={styles.nomes}>Email</h2>
            <input
              className={styles.input}
              value={usuario.email}
              readOnly
              type="text"
            />
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
            alt="FotoPerfil"
            className={styles.img}
          />
        </div>
      </div>
    </div>
  );
};

export default Perfil;
