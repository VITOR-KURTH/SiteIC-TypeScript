'use client';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import '../../styles/Global.css';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', senha: '' });
  const [isLoading, setIsLoading] = useState(false); // Estado para mostrar carregamento
  const router = useRouter();

  // Redireciona para o perfil se o usuário já estiver logado
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload do token JWT
      const isExpired = Date.now() >= payload.exp * 1000; // Verifica se o token expirou
      if (isExpired) {
        localStorage.removeItem('authToken'); // Remove token expirado
      } else {
        router.push('/Perfil'); // Redireciona para o perfil
      }
    }
  }, [router]);

  // Captura os valores do formulário
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submete os dados de login
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validações simples
    if (!formData.email || !formData.senha) {
      alert('Todos os campos devem ser preenchidos.');
      return;
    }

    if (!formData.email.includes('@') || formData.email.endsWith('@')) {
      alert('Digite um e-mail válido.');
      return;
    }

    setIsLoading(true); // Ativa o estado de carregamento

    try {
      const response = await axios.post('http://localhost:3333/login', formData);
      const { token } = response.data;

      // Salva o token no localStorage
      localStorage.setItem('authToken', token);

      alert(response.data.message || 'Login bem-sucedido!');
      router.push('/Perfil'); // Redireciona para a página de perfil
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.error || 'Erro ao autenticar.');
      } else {
        alert('Erro inesperado. Por favor, tente novamente.');
      }
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento
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
              <button className={styles.button} type="submit" disabled={isLoading}>
                {isLoading ? 'Carregando...' : 'Entrar'}
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
