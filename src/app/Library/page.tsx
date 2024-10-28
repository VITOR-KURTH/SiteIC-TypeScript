import React from 'react'
import styles from  './page.module.css'
import '../../styles/Global.css';
import Card from '../../Components/Card/Card';


const Library = () => {


  return (
    <div className={styles.container}>

        <h1 className={styles.title}>Biblioteca Virtual</h1>

     <Card/>
    </div>
  )
}

export default Library
