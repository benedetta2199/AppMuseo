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
  const updateCurrentRouteExtra = useStore((state) => state.updateCurrentRouteExtra);
  const endRoute = useStore((state) => state.endRoute);
  const termina = useStore((state) => state.termina);

  let firstTime = true;

  const incrementPoint = 10;
  const extraPoint = 3;
  
  
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
    nextreperto.esterno ? r.replace('/map')  : r.replace('/indizio') ;
  }

  return (
    <main className={styles.main}>
      <div className={`c${reperto.colore}`}></div>
      <div className="position-relative mt-4">
         <h1 className={styles.title}>{reperto.nome}</h1>
        <Image width={500} height={500} src={'/reperti/'+reperto.img+'.webp'} alt='' className={`${styles.luogo} shadowR`} priority/>
        <p className="px-3">{reperto.descrizione}</p>
      </div>

      {'extra' in reperto 
        ? <button className={`${reperto.colore} btn text-light t-abo mb-2`} onClick={() => {updateCurrentRouteExtra(incrementPoint,extraPoint); r.push({pathname: '/extra',query: { data: reperto.extra}})}}>Contenuti Extra</button>
        : <></>}
      { termina() 
        ? <button className={`${reperto.colore}Border btn white t-abo`} onClick={() => {endRoute();r.replace('/congratulation')}}>  Termina il percorso </button>
        : <button className={`${reperto.colore}Border btn white t-abo`} onClick={() => linkNextPage()}>  Scopri il prossimo indizio </button>
      }
    </main> 
    /**/
  )
}
