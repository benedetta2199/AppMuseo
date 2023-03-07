import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { arrayUnion, doc, getDoc, increment, serverTimestamp, updateDoc } from "firebase/firestore";

import styles from '@/Home.module.css'
import db from '@database'
import useStore from "@store";
import Link from "next/link";

export default function Reperto() {
  
  const r = useRouter();

  const i = useStore((state) => state.currentIdReperto);
  const getReperto = useStore((state) => state.getReperto);
  const reperto = getReperto(i);
  const percorso = useStore((state) => state.currentRoute);
  const endRoute = useStore((state) => state.endRoute);

  const updatePointUser = useStore((state) => state.updatePointUser);
  const addReperto = useStore((state) => state.addReperto);
  const updateCurrentRoute = useStore((state) => state.updateCurrentRoute);
  const isLast = useStore((state) => state.isLast);

  const [firstTime, setFirstTime] = useState(true);
  const [src, setSrc] = useState('');

  const incrementPoint = 10;
  
  if(firstTime){
    updatePointUser(increment);
    addReperto();
    updateCurrentRoute(increment);
    isLast() ? setSrc('./congratulation') : setSrc('./indizio');
    setFirstTime(false);
  }

  return (
    <main className={styles.main}>
      <div className={`c${reperto.colore}`}></div>
      <div className="position-relative mt-4">
         <h1 className={styles.title}>{reperto.nome}</h1>
         <p className="t-elite">{reperto.anno}</p>
        <img src={reperto.img+'.webp'} className={`${styles.reperto} shadowR`}/>
        <p className="px-3">{reperto.descrizione}</p>
      </div>

      <button className={`${reperto.colore} btn text-light t-abo mb-2`}>  Accumula più punti  </button>
      <Link className="btn text-light gray t-abo" href={src}>  Scopri il prossimo indizio </Link>
    </main>
  )
}
