import { useEffect, useState } from "react";
import { IoQrCode } from "react-icons/io5";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";

import db from '@database';
import styles from '@/Home.module.css';

export default function Home() {

  const r = useRouter();
  const {id, idRoute, idUserRoute, index, lenght, idRep} = r.query;
  
  const [text, setText] = useState('');
  const [img, setImg] = useState('');
  const [colore, setColore] = useState('');
  const [desc, setDesc] = useState('');

  const loadReperto = async () => {
    const docRef = doc(db, "reperto", idRep);
    const docSnap = await getDoc(docRef);
    const t =docSnap.data();

    setText(t.piano);
    setColore(t.colore);
    setDesc(t.indizio);
    setImg( './piano/'+t.piano+'-'+t.sala.replaceAll(' ','-')+'.webp');
  }

  useEffect(()=>{
    loadReperto();
  },[]);

  return (
    <main className={`${styles.main} ${colore} lock-height`}>
      <div className={styles.obliquo}></div>
      <div className="mt-4 text-dark position-relative">
         <h1 className="mb-5 pb-3"> Trova il reperto </h1>
         <h2 className={`${styles.title} h6 text-end px-5`}>Piano {text}</h2>
        <img src={`${img}`} className={styles.piano}/>
        <p className={`${styles.indizio} px-3 t-elite pt-2`}>{desc}</p>
      </div>

      <button className={`${styles.scan} bScan btn`}
        onClick={()=> r.push({ pathname: './scanQr', query: {id: id,idRep: idRep, idRoute: idRoute, idUserRoute:idUserRoute, index: index, lenght: lenght}})}>
          <IoQrCode/>
      </button>
      <p className={styles.scanText}>Una volta trovato il reperto scansiona il Qrcode corrispondente</p>
      
    </main>
  )
}
