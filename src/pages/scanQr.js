import React, { useState } from 'react'
import { QrReader } from 'react-qr-reader';
import { Toast } from 'react-bootstrap';
import {IoClose} from "react-icons/io5";
import { useRouter } from 'next/router';

import useStore from "@store";
import styles from '@/Home.module.css'

export default function scanQR() { 

  const r = useRouter();
  const idRep = useStore((state) => state.currentIdReperto);
  const [show, setShow] = useState(false);


  return (
    <main className={`${styles.main} lock-height`}>
      <QrReader
        constraints={{facingMode: 'environment'}}
        onResult={(result) => {
          if (!!result) {
            if(result?.text===idRep){
              r.replace('./reperto');
            } else{
              setShow(true);
            }
          }
        }}
        className={styles.camera} style={{ width: '100%', height: '100%' }}
      />

    <Toast show={show} onClose={()=>setShow(false)} className='z-3'>
      <Toast.Header>
        <IoClose className='redT'/>
        <strong className="me-auto redT t-abo">Ritenta</strong>
      </Toast.Header>
      <Toast.Body>Il reperto trovato non è il tuo tesoro...</Toast.Body>
    </Toast>
    </main>
  );
};