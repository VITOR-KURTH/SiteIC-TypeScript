'use client';
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
  const [repeatPassword, setRepeatPassword] = useState<string>(''); // Estado para repetir senha
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter(); // Instancia o hook para redirecionamento

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRepeatPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value); // Atualiza o estado da repetição de senha
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

     // Validações de campos
     if (!formData.nome || !formData.email || !formData.senha || !repeatPassword) {
      alert('Todos os campos devem ser preenchidos.');
      return;
    }

    if (formData.senha !== repeatPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    if (!formData.email.includes('@') || formData.email.endsWith('@')) {
      alert('Digite um e-mail válido.');
      return;
    }

    try {
      if (isEditing) {
        const response = await axios.put(`http://localhost:3333/usuarios/${formData.email}`, formData);
        alert(response.data.message || 'Usuário atualizado com sucesso!');
        setIsEditing(false);
      } else {
        const response = await axios.post('http://localhost:3333/usuarios', formData);
        alert(response.data.message || 'Usuário cadastrado com sucesso!');
        router.push('/Login'); // Agora redireciona para a página de Login após o cadastro
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
            <input
              className={styles.input}
              placeholder="Repetir senha"
              type="password"
              value={repeatPassword}
              onChange={handleRepeatPasswordChange} // Atualiza o estado de repetir senha
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
