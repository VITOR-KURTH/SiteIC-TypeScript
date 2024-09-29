import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Navbar.module.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { links } from './Links';


const Navbar: React.FC = () => {
  return (
    <nav className={styles.container}>

      <div className={styles['navbar-left']}>
        <Link href="/" className={styles['navbar-logo']}>
          <Image src="/logo.svg" alt="Logo" width={140} height={140} />
        </Link>
      </div>


      <div className={styles['navbar-right']}>
        <ul className={styles['navbar-links']}>
          {links.map((link) => (
            <li key={link.id}>
              <Link href={link.url}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles['navbar-profile']}>
          <AccountCircleIcon style={{ fontSize: 60 }} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
