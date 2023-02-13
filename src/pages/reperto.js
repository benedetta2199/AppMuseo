import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

import styles from '@/Home.module.css'
import circle from '@/Circle.module.css'
import db from '@database'

export default function Reperto() {
  
  const r = useRouter();
  //const {id, idRep, idUserRoute, index, lenght, dRep} = r.query;
  const {id, idRep, idUserRoute, index, lenght} = r.query;
  const {dRep} = r.query;
  
  const [text, setText] = useState('');
  const [img, setImg] = useState('');
  const [color, setColore] = useState('');
  const [data, setData] = useState('');
  const [desc, setDesc] = useState('');

  const incrementPoint = 10;

  try {
    const temp = JSON.parse(dRep);
    setText(temp.nome);
    setColore(temp.colore);
    setData(temp.anno);
    setDesc(temp.descrizione);
  } catch(e) {
  }
  
  /**AGGIRNA PUNTEGGIO E LA LISTA DEI REPERTI CON QUELLO APPENA SCOPERTO*/
  const updateUser = async () => {
    const refUser = doc(db, "user", id);
    await updateDoc(refUser, {punteggio: increment(incrementPoint), reperti: arrayUnion(idRep)});
  }
  /**AGGIORNA IL PUNTEGGIO E L'INDICE RELATIVO AL PROSSIMO REPERTO DA VISUALIZZARE*/
  const updatePercorsoFatto = async () => {
    const refRoute = doc(db, "percorsoFatto", idUserRoute);
    await updateDoc(refRoute, {punteggio: increment(incrementPoint),ultimoReperto: increment(1)});
  }

  /**CONTROLLA SE IL REPERTO è L'ULTIMO,
   - IN CASO AFFERMATIVO MANDA ALL'ULTIMA PAGINA
   - IN CASO NEGATIVO INDIRIZZA ALLA PAGINA DELL'INDIZIO SUCCESSIVO*/
  const nextRep = async () => {
    const i = index+1;
    if(i==lenght){
      const refRoute = doc(db, "percorsoFatto", idUserRoute);
      await updateDoc(refRoute, {terminato: true, data: serverTimestamp()});
      r.push({ pathname: './indizio', query: {id: id, idUserRoute: idUserRoute, index: i, lenght: lenght, idRep: next}});
    }else{
      r.push({ pathname: './indizio', query: {id: id, idUserRoute: idUserRoute, index: i, lenght: lenght, idRep: next}});
    }
  }

  useEffect(()=>{
    updateUser();
    updatePercorsoFatto();

  },[]);

  return (
    <main className={styles.main}>
      <div className={circle.c1}></div>
      <div className="position-relative mt-4">
         <h1 className={styles.title}>{text}</h1>
         <p className="t-elite">{data}</p>
        <img src="./reperti/pithos.png" className={`${styles.reperto} shadowR`}/>
        <p className="px-3">{desc}</p>
      </div>

      <button className={`${color} btn text-light t-abo mb-2`}>  Accumula più punti  </button>
      <button className="btn text-light gray t-abo" onClick={()=>nextRep()}>  Scopri il prossimo indizio </button>
    </main>
  )
}
