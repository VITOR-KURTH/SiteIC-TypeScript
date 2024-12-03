'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Navbar.module.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verifica se o usuário está logado ao carregar a Navbar
  useEffect(() => {
    const token = localStorage.getItem('token'); // Busca o token no localStorage
    setIsLoggedIn(!!token); // Define o estado com base na existência do token
  }, []);

  return (
    <nav className={styles.container}>
      <div className={styles['navbar-left']}>
        <Link href="/" legacyBehavior>
          <a className={styles['navbar-logo']}>
            <Image src="/LogoIC.svg" alt="Logo" width={140} height={140} />
          </a>
        </Link>
      </div>

      <div className={styles['navbar-right']}>
        <ul className={styles['navbar-links']}>
          <li>
            <Link href="/" legacyBehavior>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/About" legacyBehavior>
              <a>Sobre</a>
            </Link>
          </li>
          <li>
            <Link href="/Library" legacyBehavior>
              <a>Biblioteca</a>
            </Link>
          </li>
          <li>
            <Link href="/Calculator" legacyBehavior>
              <a>Calculadora</a>
            </Link>
          </li>
          <li>
            <Link href="/IA" legacyBehavior>
              <a>Inteligência Artificial</a>
            </Link>
          </li>
          <li>
            <Link href="/Contact" legacyBehavior>
              <a>Contato</a>
            </Link>
          </li>

          {/* Exibe o link para o perfil ou cadastro/login dependendo do estado de autenticação */}
          <li>
            <Link href={isLoggedIn ? '/Perfil' : '/Login'} legacyBehavior>
              <a>
                <AccountCircleIcon style={{ fontSize: 55 }} />
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
