import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { arrayUnion, doc, getDoc, increment, serverTimestamp, updateDoc } from "firebase/firestore";

import styles from '@/Home.module.css'
import db from '@database'
import useStore from "@store";
import Image from "next/image";

export default function Reperto() {
  
  const r = useRouter();

  const getReperto = useStore((state) => state.getReperto);
  const reperto = getReperto() || {};

  const updatePointUser = useStore((state) => state.updatePointUser);
  const addReperto = useStore((state) => state.addReperto);
  const updateCurrentRoute = useStore((state) => state.updateCurrentRoute);
  const isLast = useStore((state) => state.isLast);

  let firstTime = true;

  const incrementPoint = 10;
  
  
  useEffect(()=>{
    if(firstTime){
        console.log('ENTER');
        updateCurrentRoute(incrementPoint);
        addReperto();
        updatePointUser(incrementPoint);
      firstTime = false;
    }
  }, []);
  
  const linkNextPage = () =>{
    const src = isLast() ? '/congratulation' : '/indizio';
    console.log('src: '+ src);
    r.push(src);
  }

  return (
    <main className={styles.main}>
      <div className={`c${reperto.colore}`}></div>
      <div className="position-relative mt-4">
         <h1 className={styles.title}>{reperto.nome}</h1>
         <p className="t-elite">{reperto.anno}</p>
        <Image width={500} height={500} src={'/reperti/'+reperto.img+'.webp'} className={`${styles.reperto} shadowR`} priority/>
        <p className="px-3">{reperto.descrizione}</p>
      </div>

      <button className={`${reperto.colore} btn text-light t-abo mb-2`}>  Accumula più punti  </button>
      <button className={`${reperto.colore}Border btn white t-abo`} onClick={() => linkNextPage()}>  Scopri il prossimo indizio </button>
    </main>
  )
}
