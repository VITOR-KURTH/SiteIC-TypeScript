'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import '../../styles/Global.css';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', senha: '' });
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validações
    if (!formData.email || !formData.senha) {
      alert('Todos os campos devem ser preenchidos.');
      return;
    }

    if (!formData.email.includes('@') || formData.email.endsWith('@')) {
      alert('Digite um e-mail válido.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3333/login', formData);
      const { token } = response.data;

      // Armazena o token no localStorage
      localStorage.setItem('authToken', token);

      alert(response.data.message || 'Login bem-sucedido!');
      router.push('/Perfil'); // Redireciona para a página de perfil
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.error || 'Erro ao autenticar.');
      } else {
        alert('Erro inesperado. Por favor, tente novamente.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.item1}>
        <Image src="/Rocket.svg" width={500} height={500} alt="Rocket" className={styles.img} />
      </div>
      <div className={styles.container1}>
        <div className={styles.containerCadastro}>
          <h1 className={styles.title}>Login</h1>
          <form className={styles.inputContainer} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              placeholder="E-mail"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              className={styles.input}
              placeholder="Senha"
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleInputChange}
            />
            <div className={styles.buttonContainer}>
              <button className={styles.button} type="submit">
                Entrar
              </button>
              <Link href="/Cadastro" passHref>
                <button className={styles.button} type="button">
                  Cadastrar
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
