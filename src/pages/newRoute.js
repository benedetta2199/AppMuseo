import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoHome } from "react-icons/io5";
import {getDocs, collection, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import {IoCheckmarkOutline, IoClose} from "react-icons/io5"; 
import { Col, Row } from "react-bootstrap";

import db from '@database'
import styles from '@/Home.module.css'

export default function Home() {
  const r = useRouter();
  const {id} = r.query;

  const [listRoute, setListRoute] = useState([]);

  const loadRoute = async () => {
    let list = [];
    const querySnapshot = await getDocs(collection(db, "percorso"));
    querySnapshot.forEach((element) => {
      list=list.concat({id: element.id, route: element.data()});
    });
    setListRoute(listRoute => list);
  }

  const startRoute = async (it) => {
    const docRef = await addDoc(collection(db, "percorsoFatto"), {
      data: null,
      nome: it.id,
      punteggio: 0,
      terminato: false,
      ultimoReperto: 0,
    });
    const refUser = doc(db, "user", id);
    await updateDoc(refUser, {percorsiFatti: arrayUnion(docRef.id)});
    console.log(docRef);
    const next = it.route.reperti[0];
    r.push({ pathname: './indizio', query: {id: id, idUserRoute: docRef.id, index: 0, lenght: it.route.reperti.length, idRep: next}});
  }

  useEffect(()=>{
    loadRoute();
  },[]);

  return (
    <main className={`${styles.main} lock-height`}>
      <h1>Visualizza i percorsi terminati</h1>
      <p>Clicca su un percorso per vedere i dettagli</p>
      <div className="d-flex flex-wrap justify-content-around ps-4">
        {listRoute.map((it, i) =>{
            const item = it.route;
            return (
              <div className={`my-3 d-flex rounded-start shadow white`} key={i}>
                <img src={item.img} className={`${styles.imgRoute} rounded `} alt=''/>
                <div className="w-75 me-1">
                  <p className={`${item.colore}T m-0 t-abo small`}>{item.nome}</p>
                  <Row className="text-center ">
                    <Col>
                      <small>Durata</small>
                      <p className="m-0 t-elite">{item.tempo}'</p>
                    </Col>
                    <Col className="border-start border-end">
                      <small>Interno</small>
                      <p className="m-0 t-elite"><IoCheckmarkOutline/></p>
                    </Col>
                    <Col>
                      <small>Esterno</small>
                      <p className="m-0 t-elite">{item.esterno? <IoCheckmarkOutline/>:<IoClose/>} </p>
                    </Col>
                  </Row>
                <button className={`${item.colore} btn btn-sm t-abo text-white m-1`}
                  onClick={()=>startRoute(it)}>Inizia</button>
                </div>
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
