import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import Ana from '../../../public/anabe.png';
import Yuri from '../../../public/yuri.png';
import Isa from '../../../public/isa.png';
import Linkedin from '../../../public/Linkedin.svg';
import Github from '../../../public/Github.svg';

 const Contact: React.FC = () => {
     return (
     <div className={styles.main}>
       <h1 className={styles.title}>Contato</h1>

       <div className={styles.container}>
         {/* Pedro Zanette */}
         <div className={styles.member}>
           <Image className={styles.image} src={Ana} alt="Ana Beatriz Martins" />
           <h3>Ana Beatriz Martins</h3>
          <div className={styles.div}>
             <a href="https://www.linkedin.com/in/anabe-sc/" target="_blank" rel="noopener noreferrer">
               <Image className={styles.social} src={Linkedin} alt="LinkedIn de Ana Beatriz Martins" />
             </a>
             <a href="https://github.com/anabmartins" target="_blank" rel="noopener noreferrer">
               <Image className={styles.social} src={Github} alt="GitHub de Ana Beatriz Martins" />
            </a>
           </div>
         </div>

         {/* Vitor kurth */}
         <div className={styles.member}>
           <Image className={styles.image} src={Yuri} alt="Yuri Castilho" />
           <h3>Yuri Castilho</h3>
           <div className={styles.div}>
             <a href="https://www.linkedin.com/in/yuri-castilhoo/" target="_blank" rel="noopener noreferrer">
               <Image className={styles.social} src={Linkedin} alt="LinkedIn de Yuri Castilho" />
             </a>
             <a href="https://github.com/YuriCast" target="_blank" rel="noopener noreferrer">
               <Image className={styles.social} src={Github} alt="GitHub de Yuri Castilho" />
             </a>
           </div>
         </div>

         {/* Sara Pereir */}
         <div className={styles.member}>
           <Image className={styles.image} src={Isa} alt="Isadora Wenzel" />
           <h3>Isadora Wenzel</h3>
           <div className={styles.div}>
             <a href="https://www.linkedin.com/in/isadora-ws/" target="_blank" rel="noopener noreferrer">
               <Image className={styles.social} src={Linkedin} alt="LinkedIn de Isadora Wenzel" />
             </a>
             <a href="https://github.com/isaws06" target="_blank" rel="noopener noreferrer">
               <Image className={styles.social} src={Github} alt="GitHub de Isadora Wenzel" />
             </a>
           </div>
         </div>
       </div>
     </div>
   );
};

export default Contact;
