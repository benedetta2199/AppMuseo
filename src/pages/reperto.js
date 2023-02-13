import { useState } from "react";
import { useRouter } from "next/router";

import styles from '@/Home.module.css'
import circle from '@/Circle.module.css'

export default function Home() {
  
  const r = useRouter();
  const {id, idRep, idUserRoute, index, lenght, dRep} = r.query;
  
  const [text, setText] = useState('');
  const [color, setColore] = useState('');
  const [data, setData] = useState('');
  const [desc, setDesc] = useState('');

  try {
    const temp = JSON.parse(dRep);
    setText(temp.nome);
    setColore(temp.colore);
    setData(temp.anno);
    setDesc(temp.descrizione);
  } catch(e) {
    /*const rep = {anno: '', colore:'', descrizione:'', img:'', indizio:'', nome:'',piano:'',sala:''};*/
  }
  
  //AGGIUNGI ALLA LISTA DEI REPERTI DELL'UTENTE QUELLO APPENA SCOPERTO
  const addRepToUser = async () => {
    const refUser = doc(db, "user", id);
    await updateDoc(refUser, {reperti: arrayUnion(idRep)});
  }
  //AGGIORNA L'INDICE RELATIVO AL PROSSIMO REPERTO DA VISUALIZZARE
  const updateLastRep = async () => {
    const refRoute = doc(db, "percorsoFatto", idUserRoute);
    await updateDoc(refRoute, {population: increment(1)});
  }
  //CONTROLLA SE IL REPERTO è L'ULTIMO,
  // - IN CASO AFFERMATIVO MANDA ALL'ULTIMA PAGINA
  // - IN CASO NEGATIVO INDIRIZZA ALLA PAGINA DELL'INDIZIO SUCCESSIVO
  const nextRep = async () => {
    //const refRoute = doc(db, "percorsoFatto", idUserRoute);
    //await updateDoc(refRoute, {population: increment(1)});
    const i = index+1;
    if(i==lenght){
      //set terminato
      //set data
    }else{
      //aggiorna il punteggio utente e percorso
      r.push({ pathname: './indizio', query: {id: id, idUserRoute: idUserRoute, index: i, lenght: lenght, idRep: next}});
    }
  }

  useEffect(()=>{
    addRepToUser();
    updateLastRep();
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
