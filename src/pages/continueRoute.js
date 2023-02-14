import { useEffect, useState } from "react";
import Card from "./api/card";
import { useRouter } from "next/router";
import { IoHome } from "react-icons/io5";
import {getDoc, doc } from "firebase/firestore";

import db from '@database'
import styles from '@/Home.module.css'

export default function Home() {
  const r = useRouter();
  const {id,droute} = r.query;
  let routes;
  try { routes = JSON.parse(droute); } catch(e) { routes = [];}

  const [listRoute, setListRoute] = useState([]);

  const loadRoute = async () => {
    let list = [];
    for (const route of routes) {
      const docRef1 = doc(db, "percorsoFatto", route);
      const docSnap1 = await getDoc(docRef1);
      const data1 = docSnap1.data();
      if(!data1.terminato){
        const docRef2 = doc(db, "percorso", data1.nome);
        const docSnap2 = await getDoc(docRef2);
        const data2 = docSnap2.data();

        const i =  data1.ultimoReperto;
        
        const perc = (data1.ultimoReperto)*100/data2.reperti.length;
        const element = {nome: data2.nome, img: data2.img, punteggio: data1.punteggio, perc: perc,hue: data2.colore, index: i, 
          leng: data2.reperti.length, idRoute: docSnap2.id, idUserRoute: docSnap1.id, next:data2.reperti[i+1]}
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
                <Card titolo={item.nome} img={item.img} punteggio={item.punteggio} altro={item.perc} hue={item.hue} contin={true}
                  data={{id:id, idRoute:item.idRoute, idUserRoute:item.idUserRoute, index: item.index, lenght: item.leng, idRep: item.next}}/>
              </div>
            )
          })
        }
        
        
      </div>
      <button className='btn bHome' onClick={()=>r.back()}>
          <IoHome className="whiteT"/>
        </button>  
    </main>
  )
}
