
import React, { useState } from 'react'
import { QrReader } from 'react-qr-reader';
import styles from '@/Home.module.css'
import { Toast } from 'react-bootstrap';
import {IoClose} from "react-icons/io5";

export default function scanQR() { 

  id=0
  
  const [data, setData] = useState('No result');

  return (
    <main className={`${styles.main} lock-height`}>
      <QrReader
        constraints={{
          facingMode: 'environment'
        }}
        onResult={(result) => {
          if (!!result) {
            console.log('Read');
            if(result?.text==id){
              console.log('Enter')
            }
          }
        }}
        className={styles.camera}
        style={{ width: '100%', height: '100%' }}
      />

    <Toast>
      <Toast.Header>
        <IoClose className='redT'/>
        <strong className="me-auto redT">Ritenta</strong>
      </Toast.Header>
      <Toast.Body>Il reperto trovato non è il tuo tesoro...</Toast.Body>
    </Toast>
    </main>
  );
};