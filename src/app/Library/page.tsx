'use client'
import React from 'react';
import styles from './page.module.css';
import Navbar from '../../Components/navbar/Navbar';


const Library = () => {


  return (
    <div className={styles.container}>
      <Navbar />

        <h2 className={styles.titleMobile}>Biblioteca Virtual</h2>
        <h1 className={styles.title}>Biblioteca Virtual</h1>


    </div>
  )
}

export default Library
