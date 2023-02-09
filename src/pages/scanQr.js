
import React, { useState } from 'react'
import { QrReader } from 'react-qr-reader';
import styles from '@/Home.module.css'

export default function scanQR() { 

  const [data, setData] = useState('No result');

  return (
    <main className={`${styles.main} lock-height`}>
      <QrReader
        onResult={(result) => {
          if (!!result) {
            setData(result?.text);
          }
        }}
        className={styles.camera}
        style={{ width: '100%', height: '100%' }}
      />
    </main>
  );
};