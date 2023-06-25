import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import { useRouter } from 'next/router';

import styles from '@/Home.module.css'


export default function Home() {

  const r = useRouter();
  const { width=400, height=800 } = useWindowSize();

  return (
    <main className={`${styles.main} lock-height d-flex`}>
      <Confetti width={Math.max(width,400)} height={Math.max(height,800)}/>
      <div className='align-self-center'>
        <h1>Complimenti!</h1>
        <p className='mx-3'>Sei un vero esploratore<br/> Hai trovato il tesoro più prezioso: la conoscenza</p>
        <button className='btn mx-auto gray whiteT t-abo' onClick={()=> r.replace('/user')}>Torna alla home </button>  
      </div>
    </main>
  )
}
