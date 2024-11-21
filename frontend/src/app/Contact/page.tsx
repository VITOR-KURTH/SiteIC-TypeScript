import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import Linkedin from '../../../public/Linkedin.svg';
import Github from '../../../public/Github.svg';

 const Contact: React.FC = () => {
     return (
     <div className={styles.main}>
       <h1 className={styles.title}>Contato</h1>
       <h2 className={styles.titleMembers}>Antigos membros</h2>
       <div className={styles.container}>
         {/* Pedro Zanette */}
         <div className={styles.member}>
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
       <h2 className={styles.titleMembers}>Novos membros</h2>
       <div className={styles.container}>
       
         {/* Pedro Zanette */}
         <div className={styles.member}>
           <h3>Pedro Zanette</h3>
          <div className={styles.div}>
             <a href="https://www.linkedin.com/in/pedro-henrique-nunes-zanette-254175269/" target="_blank" rel="noopener noreferrer">
               <Image className={styles.social} src={Linkedin} alt="LinkedIn de Pedro Zanette" />
             </a>
             <a href="https://github.com/PedroZanette" target="_blank" rel="noopener noreferrer">
               <Image className={styles.social} src={Github} alt="GitHub de Pedro Zanette" />
            </a>
           </div>
         </div>

         {/* Vitor kurth */}
         <div className={styles.member}>
           <h3>Vítor Kurth</h3>
           <div className={styles.div}>
             <a href="https://www.linkedin.com/in/v%C3%ADtor-kurth/" target="_blank" rel="noopener noreferrer">
               <Image className={styles.social} src={Linkedin} alt="LinkedIn de Vítor Kurth" />
             </a>
             <a href="https://github.com/VITOR-KURTH" target="_blank" rel="noopener noreferrer">
               <Image className={styles.social} src={Github} alt="GitHub de Vítor Kurth" />
             </a>
           </div>
         </div>

         {/* Sara Pereira */}
         <div className={styles.member}>
           <h3>Sara Pereira</h3>
           <div className={styles.div}>
             <a href="https://www.linkedin.com/in/sara-rotenski-33b6a32b9/" target="_blank" rel="noopener noreferrer">
               <Image className={styles.social} src={Linkedin} alt="LinkedIn de Sara Pereira" />
             </a>
             <a href="https://github.com/sararotenski" target="_blank" rel="noopener noreferrer">
               <Image className={styles.social} src={Github} alt="GitHub de Sara Pereira" />
             </a>
           </div>
         </div>
       </div>
     </div>
   );
};

export default Contact;
