import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import styles from '../styles/Home.module.css'
import { IoChevronDownOutline, IoHome } from "react-icons/io5";
import {getDoc, doc } from "firebase/firestore";

import db from './db/firestore'


export default function Home() {
  const r = useRouter();
  const {dreperti} = r.query;
  const reperti = JSON.parse(dreperti);
 
  const [text, setText] = useState('');
  const [anno, setAnno] = useState('');
  const [img, setImg] = useState('');
  const [desc, setDesc] = useState('');
  const [colore, setColore] = useState('gray');
  const [listRep, setListRep] = useState([]);
  const [index, setIndex] = useState(null);

  const loadReperti = async () => {
    const list = [];
    for (const rep of reperti) {
      const docRef = doc(db, "reperto", rep);
      const docSnap = await getDoc(docRef);
      list=list.concat(docSnap.data());
    }
    setListRep(listRep => list);
  }

  useEffect(()=>{
    loadReperti();
  },[]);
  
  const setElement = (i) =>{
    if(listRep.length>0){
      setIndex(i);
      setText(listRep[i].nome);
      setAnno(listRep[i].anno);
      setImg(listRep[i].img);
      setDesc(listRep[i].descrizione);
      setColore(listRep[i].colore);
    }
  }

  


  /*
  https://firebasestorage.googleapis.com/v0/b/museo-717ca.appspot.com/o/piano%2F1_domusaurea.png?alt=media&token=0aca7e1d-78fc-40e5-896a-4fbb5619c9ff
  https://firebasestorage.googleapis.com/v0/b/museo-717ca.appspot.com/o/reperti%2Fmodellino.png?alt=media&token=b7d6ff06-73f2-4124-b294-33b7c2114f76
  */
  return (
    <main className={`${styles.main} ${colore} pt-2 lock-height`}>
      <h1>Reperti raccolti</h1>
        <div className={`${styles.vertical} white rounded ps-1`}>
          {listRep.map((item, i) =>{
              return (<a onClick={()=>setElement(i)} key={i}>
                      <img src={item.img} className={`${index==i ? styles.active : 'white'} ${item.colore} w-100 p-2 pe-3 my-2`}/>
                    </a>)
            })
          }
          {listRep.length>5 ?<IoChevronDownOutline className={styles.down}/> : <></>}
        </div>
        <div className={`${styles.verticalReperto}`}>
          <img src={img} className={`w-100 p-2 shadowR`}/>
          <div>
            <h2>{text}</h2>
            <p className="t-elite ps-2 m-0">{anno}</p>
            <p className="small px-2 text-justify">{desc}</p>
          </div>
          
        </div>    

        <button className='btn bHome' onClick={()=>r.back()}>
          <IoHome className={`${colore}T`}/>
        </button>  
    </main>
  )
}
