import React from "react";
import styles from "./card.module.css";
import { caps } from '../../app/data/caps';
import Link from "next/link";
import Chapter from "./Chapter";
import '../../styles/Global.css'


const Card = () => {


  return (
    <div className={styles.container}>

        <div className={styles.caps}>
          {caps.map((item) => (
            <Link href={`/chapters/${item.id}`} className={styles.link} key={item.id}>
              <Chapter title={item.title} subtitle={item.subtitle} />
            </Link>
          ))}
        </div>


    </div>
  );
};

export default Card;
