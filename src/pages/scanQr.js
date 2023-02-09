
import React, { useState } from 'react'
import { QrReader } from 'react-qr-reader';
import styles from '@/Home.module.css'

export default function scanQR() { 

  const [data, setData] = useState('No result');

  return (
    <>
      <QrReader
        constraints={{
          facingMode: 'environment'
        }}
        onResult={(result) => {
          if (!!result) {
            setData(result?.text);
          }
        }}
        style={{ width: '100vw', height: '100vh' }}
        className={styles.camera}
      />
      <p>{data}</p>
    </>
  );
};