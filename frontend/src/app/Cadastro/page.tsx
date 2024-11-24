'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // Importa o hook para redirecionamento
import styles from './page.module.css';
import '../../styles/Global.css';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

interface Usuario {
  email: string;
  nome: string;
  senha: string;
}

const Cadastro: React.FC = () => {
  const [formData, setFormData] = useState<Usuario>({
    email: '',
    nome: '',
    senha: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter(); // Instancia o hook para redirecionamento

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const response = await axios.put(`http://localhost:3333/usuarios/${formData.email}`, formData);
        alert(response.data.message || 'Usuário atualizado com sucesso!');
        setIsEditing(false);
      } else {
        const response = await axios.post('http://localhost:3333/usuarios', formData);
        alert(response.data.message || 'Usuário cadastrado com sucesso!');
        router.push('/Perfil'); // Redireciona para a página de Perfil após o cadastro
      }
      setFormData({
        email: '',
        nome: '',
        senha: '',
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Caso seja um erro do Axios, trate o erro da resposta
        alert(error.response?.data.error || 'Erro ao processar a solicitação.');
      } else {
        // Caso seja um erro genérico
        alert('Erro inesperado. Por favor, tente novamente.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.item1}>
        <Image src="/megafone.svg" width={460} height={460} alt="megafone" className={styles.img} />
      </div>
      <div className={styles.container1}>
        <div className={styles.containerCadastro}>
          <h1 className={styles.title}>Cadastro</h1>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              placeholder="Nome de usuário"
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
            />
            <input
              className={styles.input}
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isEditing}
            />
            <input
              className={styles.input}
              placeholder="Senha"
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleSubmit}>
              {isEditing ? 'Atualizar' : 'Cadastrar'}
            </button>
            <Link href="/Login" passHref>
              <button className={styles.button}>Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
