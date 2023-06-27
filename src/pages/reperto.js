import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { arrayUnion, doc, getDoc, increment, serverTimestamp, updateDoc } from "firebase/firestore";

import styles from '@/Home.module.css'
import db from '@database'
import useStore from "@store";
import Image from "next/image";
import Link from "next/link";

export default function Reperto() {
  
  const r = useRouter();

  const getReperto = useStore((state) => state.getReperto);
  const temp = getReperto() || {};
  const [reperto, setReperto] = useState(temp);
  const nextReperto = useStore((state) => state.nextReperto);
  const updatePointUser = useStore((state) => state.updatePointUser);
  const updateCurrentRoute = useStore((state) => state.updateCurrentRoute);
  const last = useStore((state) => state.last);

  let firstTime = true;

  const incrementPoint = 10;
  
  useEffect(()=>{
    if(firstTime){
      setReperto(getReperto());
      updateCurrentRoute(incrementPoint);
      updatePointUser(incrementPoint);
      firstTime = false;
    }
  }, []);
  
  const linkNextPage = () =>{
    nextReperto(incrementPoint);
    const nextreperto = getReperto();
    nextreperto.esterno ? r.replace('/map')  : r.replace('/indizio') ;
  }

  return (
    <main className={styles.main}>
      <div className={`c${reperto.colore}`}></div>
      <div className="position-relative mt-4">
         <h1 className={styles.title}>{reperto.nome}</h1>
         <p className="t-elite">{reperto.anno}</p>
        <Image width={500} height={500} src={'/reperti/'+reperto.img+'.webp'} className={`${styles.reperto} shadowR`} alt='' priority />
        <p className="px-3">{reperto.descrizione}</p>
      </div>

      {'extra' in reperto 
        ? <button className={`${reperto.colore} btn text-light t-abo mb-2`} onClick={() => r.push({pathname: '/extra',query: { data: reperto.extra}})}>Contenuti Extra</button>
        : <></>}
      { last 
        ? <button className={`${reperto.colore}Border btn white t-abo`} onClick={() => r.replace('/congratulation')}>  Termina il percorso </button>
        : <button className={`${reperto.colore}Border btn white t-abo`} onClick={() => {linkNextPage();}}>  Scopri il prossimo indizio </button>
      }
    </main>
  )
}