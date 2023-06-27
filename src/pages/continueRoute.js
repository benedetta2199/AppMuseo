import { useEffect, useState } from "react";
import Card from "./api/card";
import { useRouter } from "next/router";
import { IoHome } from "react-icons/io5";
import useStore from "@store";
import styles from '@/Home.module.css'

export default function Home() {
  const r = useRouter();
  const routes = useStore((state) => state.percorsiIncompleti);
  const resetCurrentRoute = useStore((state) => state.resetCurrentRoute);

  useEffect(()=>{
    resetCurrentRoute();
  },[]);
  

  return (
    <main className={`${styles.main} lock-height`}>
      <h1>Visualizza i percorsi in sospeso</h1>
      <p>Clicca su un percorso per vedere i dettagli</p>
      <div className="d-flex flex-wrap justify-content-around">
        {routes.map((item, i) =>{
          console.log(item);
          let perc;
          if(item.hasOwnProperty('perc')){
            perc= item.perc;
          }else{
            perc = item.ultimoReperto*100/item.reperti.length;
          }
            return (
              <div className='mt-3' key={i}>
                <Card titolo={item.nome} img={item.img} punteggio={item.punteggio} altro={perc} hue={item.hue} contin={true}
                  idR={item.idRoute} idUR={item.id}/>
              </div>
            )
          })
        }
      </div>
      <button className='btn bHome' onClick={()=>r.back()}>
          <IoHome className="whiteT"/>
          <span hidden>Torna alla home</span>
      </button>  
    </main>
  )
}
