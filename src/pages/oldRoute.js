import { useEffect, useState } from "react";
import Card from "./api/card";
import { useRouter } from "next/router";
import { format } from 'date-fns'
import { it } from 'date-fns/locale';
import { IoHome } from "react-icons/io5";
import {getDoc, doc } from "firebase/firestore";

import db from '@database'
import styles from '@/Home.module.css'

export default function Home() {
  const r = useRouter();
  const {droute} = r.query;
  let routes;
  try {
    routes = JSON.parse(droute);
  } catch(e) {
    routes = [];
  }

  const [listRoute, setListRoute] = useState([]);

  const loadRoute = async () => {
    let list = [];
    for (const route of routes) {
      const docRef1 = doc(db, "percorsoFatto", route);
      const docSnap1 = await getDoc(docRef1);
      const data1 = docSnap1.data();
      if(data1.terminato){
        const docRef2 = doc(db, "percorso", data1.nome);
        const docSnap2 = await getDoc(docRef2);
        const data2 = docSnap2.data();
        /*item.data.toDate()*/
        const element = {nome: data2.nome, img: data2.img, punteggio: data1.punteggio, data: format(data1.data.toDate(),'d MMMM yyyy', {locale: it}), hue: data2.colore}
        list=list.concat(element);
      }
    }
    setListRoute(listRoute => list);

  }

  useEffect(()=>{
    loadRoute();
  },[]);

  return (
    <main className={`${styles.main} lock-height`}>
      <h1>Visualizza i percorsi terminati</h1>
      <p>Clicca su un percorso per vedere i dettagli</p>
      <div className="d-flex flex-wrap justify-content-around">
        {listRoute.map((item, i) =>{
            return (
              <div className='mt-3' key={i}>
                <Card titolo={item.nome} img={item.img} punteggio={item.punteggio} altro={item.data} hue={item.hue} contin={false}/>
              </div>
            )
          })
        }
        
        
      </div>
      {/*0
      
      
      <div className={`${styles.cardRoute} w-25 position-relative`}>
         <img src="./percorsi/seaRoute.jpg"/>
          <div className="shadow white rounded px-3">
            <p className="">Nome</p>
            <p>Punteggio</p>
            <p >Data</p>
          </div>
      </div>
      <div className={`${styles.cardRoute} w-25 position-relative`}>
         <div className="shadow white rounded px-3">
            <p className="t-abo m-0">Nome</p>
            <p className="">Punteggio</p>
            <p className="small">Terminato in data: <small className="t-elite">00/00/0000</small></p>
          </div>
          <img src="./percorsi/romanRoute.jpg" className="rounded-circle"/>
  </div>*/}
      <button className='btn bHome' onClick={()=>r.back()}>
          <IoHome className="whiteT"/>
        </button>  
    </main>
  )
}
