'use client'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
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
  const [usuarios, setUsuarios] = useState<Usuario[]>([]); // Lista de usuários
  const [formData, setFormData] = useState<Usuario>({
    email: '',
    nome: '',
    senha: '',
  });
  const [isEditing, setIsEditing] = useState(false); // Controla se estamos editando ou criando

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get<Usuario[]>('http://localhost:3000/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateUsuarios = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/usuarios', formData);
      setFormData({
        email: '',
        nome: '',
        senha: '',
      });
      fetchUsuarios();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUsuarios = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/usuarios/${formData.email}`, formData);
      setFormData({
        email: '',
        nome: '',
        senha: '',
      });
      setIsEditing(false);
      fetchUsuarios();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUsuarios = async (email: string) => {
    try {
      await axios.delete(`http://localhost:3000/usuarios/${email}`);
      fetchUsuarios();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditUsuario = (usuario: Usuario) => {
    setFormData({
      email: usuario.email,
      nome: usuario.nome,
      senha: usuario.senha,
    });
    setIsEditing(true);
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
              disabled={isEditing} // Desabilita o email durante a edição
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
            <button className={styles.button} onClick={handleCreateUsuarios}>
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
