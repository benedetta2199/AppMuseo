import { doc, getDoc } from 'firebase/firestore';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import db from '@database'
import styles from '@/Home.module.css'

export default function Home() {
  const r = useRouter();
  const {id} = r.query;

  const[user,setUser]=useState('')  
  const { width=400, height=800 } = useWindowSize();
    

  const loadUser = async () => {
    const docRef = doc(db, "user", id);
    const docSnap = await getDoc(docRef);
    setUser(JSON.stringify(docSnap.data()));
  }


  useEffect(()=>{
    loadUser();
  },[]);

  return (
    <main className={`${styles.main} lock-height d-flex`}>
      <Confetti width={Math.max(width,400)} height={Math.max(height,800)}/>
      <div className='align-self-center'>
        <h1>Complimenti!</h1>
        <p className='mx-3'>Sei un vero esploratore<br/> Hai trovato il tesoro più prezioso: la conoscenza</p>
        <button className='btn mx-auto gray whiteT t-abo' onClick={()=>r.push({ pathname: './user', query: {id: id, data: user}})}>
            Torna alla home
          </button>  
      </div>
    </main>
  )
}
