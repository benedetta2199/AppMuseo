
import React, { useState } from 'react'
import { QrReader } from 'react-qr-reader';

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
        style={{ width: '100%' }}
      />
      <p>{data}</p>
    </>
  );
};