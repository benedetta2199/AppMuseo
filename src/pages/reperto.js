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
  const {last, setLast} = useState(false);

  const incrementPoint = 10;
  
  
  useEffect(()=>{
    if(firstTime){
      console.log('this rep');
      console.log(getReperto());
        updateCurrentRoute(incrementPoint).then(()=>addReperto());
        updatePointUser(incrementPoint);
      firstTime = false;
      setLast(isLast());
    }
  }, []);
  
  const linkNextPage = () =>{
    let src;
    if(last){
      r.push('/congratulation');
    } else{
      const nextreperto = getReperto();
      console.log(nextreperto);
      nextreperto.esterno ? r.push('/map')  : r.push('/indizio') ;
    }
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

      {'extra' in reperto ? <button className={`${reperto.colore} btn text-light t-abo mb-2`}>  Accumula più punti  </button> : <></>}
      <button className={`${reperto.colore}Border btn white t-abo`} onClick={() => linkNextPage()}>  Scopri il prossimo indizio </button>
    </main>
  )
}