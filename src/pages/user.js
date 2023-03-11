import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from '@/Home.module.css'
import useStore from "@store";

import imgBG from "@img/acropoli.webp"
import logo from "@img/logoW.webp"

export default function User() {
  const r = useRouter();
  const user = useStore((state) => state.user);
  const name = user.id || '';
 
  const inizializeCronoReperti = useStore((state) => state.inizializeCronoReperti);
  const inizializePercorsiFatti = useStore((state) => state.inizializePercorsiFatti);
  /* INIZIALIZZA I REPERTI OTTENUTI E I PERCORSI FATTI DALL'UTENTE */
  useEffect(()=>{
    inizializeCronoReperti();
    inizializePercorsiFatti();
  },[]);

  return (
    <main className={styles.main}>
      <Image width={500} height={500} src={imgBG} className={styles.profilePic} alt="" priority placeholder="blur"/>
      <Image width={100} height={100} src={logo} className={styles.logoW} alt="" priority placeholder="blur"/>
      <div className={styles.picCircle}></div>
      
      
      <div className={`${styles.user} position-relative`}>
        <h1>{name.split("@")[0]}</h1>
        <h2>{user.punteggio}</h2>
        <div>
          <Link href='./newRoute' className="d-flex align-items-center m-auto w-75 border-top border-end rounded mt-3 mb-5 btn">
            <img src="./menu/newroute.webp" width={70} alt=''/>
            <span className='mx-2 my-0'>Inizia un nuovo percorso</span>
          </Link>
          <Link href='./continueRoute' className="d-flex align-items-center m-auto w-75 border-top border-end rounded my-5 btn">
            <img src="./menu/oldroute.webp" width={70} alt=''/>
            <span className='mx-2 my-0'>Continua un percorso in sospeso</span>
          </Link>

          <Link href='./oldRoute' className="d-flex align-items-center m-auto w-75 border-top border-end rounded my-5 btn" onClick={()=>inizializePercorsiFatti}>
            <img src="./menu/percorsi.webp" width={70} alt=''/>
            <span className='mx-2 my-0'>Guarda i percorsi terminati</span>
          </Link>
          
          <Link href='./cronoReperti' className="d-flex align-items-center m-auto w-75 border-top border-end rounded my-5 btn" onClick={()=>inizializeCronoReperti()}>
            <img src="./menu/collezionabili.webp" width={70} alt=''/>
            <span className='mx-2 my-0'>Guarda i reperti raccolti</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
