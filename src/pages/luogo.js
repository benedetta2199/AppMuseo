import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from '@/Home.module.css'
import useStore from "@store";
import Image from "next/image";

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
    nextReperto();
    const nextreperto = getReperto();
    nextreperto.esterno ? r.push('/map')  : r.push('/indizio') ;
  }

  return (
    <main className={styles.main}>
      <div className={`c${reperto.colore}`}></div>
      <div className="position-relative mt-4">
         <h1 className={styles.title}>{reperto.nome}</h1>
        <Image width={500} height={500} src={'/reperti/'+reperto.img+'.webp'} className={`${styles.luogo} shadowR`} priority/>
        <p className="px-3">{reperto.descrizione}</p>
      </div>

      {'extra' in reperto 
        ? <button className={`${reperto.colore} btn text-light t-abo mb-2`} onClick={() => r.push({pathname: '/extra',query: { data: reperto.extra}})}>Contenuti Extra</button>
        : <></>}
      { last 
        ? <button className={`${reperto.colore}Border btn white t-abo`} onClick={() => r.push('/congratulation')}>  Termina il percorso </button>
        : <button className={`${reperto.colore}Border btn white t-abo`} onClick={() => linkNextPage()}>  Scopri il prossimo indizio </button>
      }
    </main> 
    /**/
  )
}
