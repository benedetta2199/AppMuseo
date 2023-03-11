import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoHome } from "react-icons/io5";
import {getDocs, collection, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import {IoCheckmarkOutline, IoClose} from "react-icons/io5"; 
import { Col, Row } from "react-bootstrap";
import Link from "next/link";

import db from '@database'
import styles from '@/Home.module.css'
import useStore from "@store";
import Image from "next/image";

export default function Home() {
  const r = useRouter();

  const listRoute = useStore((state) => state.allRoute);
  const addNewRoute = useStore((state) => state.addNewRoute);

  /*const startRoute = async (it) => {

    //crea una nuova route
    
    //inizializza la nuova route
    inizializeCurrentRoute();


    const refUser = doc(db, "user", id);

    await updateDoc(refUser, {percorsiFatti: arrayUnion(docRef.id)});
    console.log(docRef);
    const next = it.route.reperti[0];
    r.push({ pathname: './indizio', query: {id: id, idRouter: it.id, idUserRoute: docRef.id, index: 0, lenght: it.route.reperti.length, idRep: next}});
  }*/

  return (
    <main className={`${styles.main} lock-height`}>
      <h1>Inizia un nuovo percorso</h1>
      <div className="d-flex flex-wrap justify-content-around ps-4">
        {Array.from(listRoute, x => { return {id:x[0], data: x[1]}}).map((it, i) =>{
            const item = it.data;
            return (
              <div className={`my-3 d-flex rounded-start shadow white`} key={i}>
                <Image src={'/percorsi/'+item.img} width={250} height={250} className={`${styles.imgRoute} rounded `} alt='' priority/>
                <div className="w-75 me-1">
                  <p className={`d${item.colore}T m-0 t-abo h5 font-weight-bold`}>{item.nome}</p>
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
                <Link className={`d${item.colore} btn btn-sm t-abo text-white m-1 font-weight-bold`} href='./indizio' onClick={()=>addNewRoute(it.id)}>
                  Inizia
                </Link>
                </div>
              </div>
            )
          })
        }
        
        
      </div>
      <button className='btn bHome' onClick={()=>r.back()}>
          <IoHome className="whiteT"/>
          <span hidden className="dredT">Torna alla home</span>
        </button>  
    </main>
  )
}
