
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
        className={styles.camera}
        style={{ width: '100%', height: '100%' }}
      />
      <p>{data}</p>
    </>
  );
};