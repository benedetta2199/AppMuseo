import { useEffect, useState } from "react";
import Card from "./api/card";
import { useRouter } from "next/router";
import { IoHome } from "react-icons/io5";
import {getDoc, doc } from "firebase/firestore";

import db from '@database'
import styles from '@/Home.module.css'

export default function Home() {
  const r = useRouter();
  const routes = useStore((state) => state.percorsiIncompleti);

  return (
    <main className={`${styles.main} lock-height`}>
      <h1>Visualizza i percorsi in sospeso</h1>
      <p>Clicca su un percorso per vedere i dettagli</p>
      <div className="d-flex flex-wrap justify-content-around">
        {routes.map((item, i) =>{
            return (
              <div className='mt-3' key={i}>
                <Card titolo={item.nome} img={item.img} punteggio={item.punteggio} altro={item.perc} hue={item.hue} contin={true}
                  data={{id:id, idRoute:item.idRoute, idUserRoute:item.idUserRoute, index: item.index, lenght: item.leng, idRep: item.next}}/>
              </div>
            )
          })
        }
      </div>
      <button className='btn bHome gray' onClick={()=>r.back()}>
          <IoHome className="whiteT"/>
          <span hidden>Torna alla home</span>
      </button>  
    </main>
  )
}
