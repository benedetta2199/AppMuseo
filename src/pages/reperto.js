import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

import styles from '@/Home.module.css'
import circle from '@/Circle.module.css'
import db from '@database'

export default function Reperto() {
  
 
  return (
   {/* <main className={styles.main}>
      <div className={circle.c1}></div>
      <div className="position-relative mt-4">
         <h1 className={styles.title}>{text}</h1>
         <p className="t-elite">{data}</p>
        <img src="./reperti/pithos.png" className={`${styles.reperto} shadowR`}/>
        <p className="px-3">{desc}</p>
      </div>

      <button className={`${color} btn text-light t-abo mb-2`}>  Accumula più punti  </button>
      <button className="btn text-light gray t-abo" onClick={()=>nextRep()}>  Scopri il prossimo indizio </button>
  </main>*/}
  )
}
