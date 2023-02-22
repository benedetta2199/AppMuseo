import { useRouter } from "next/router";

import styles from '@/Home.module.css'

export default function User() {
  const r = useRouter();
  const {id='', data} = r.query;
  let user;
  try {
    user = JSON.parse(data);
  } catch(e) {
    user = {punteggio:'', percorsiFatti:[], reperti:[]};
  }

  return (
    <main className={styles.main}>
      <div className={styles.profilePic}></div>
      <img src="./logoW.png" className={styles.logoW} alt=""/>
      <div className={styles.picCircle}></div>
      
      
      <div className={`${styles.user} position-relative`}>
        <h1>{id.split("@")[0]}</h1>
        <h2>{user.punteggio}</h2>
        <div>
          <button className="d-flex align-items-center m-auto w-75 border-top border-end rounded mt-3 mb-5 btn"
            onClick={()=> r.push({ pathname: './newRoute', query: {id:id} })}>
            <img src="./menu/newRoute.png" width={70} alt=''/>
            <span className='mx-2 my-0'>Inizia un nuovo percorso</span>
          </button>
          <button className="d-flex align-items-center m-auto w-75 border-top border-end rounded my-5 btn"
            onClick={()=> r.push({ pathname: './continueRoute', query: {id:id,droute: JSON.stringify(user.percorsiFatti)} })}>
            <img src="./menu/oldRoute.png" width={70} alt=''/>
            <span className='mx-2 my-0'>Continua un percorso in sospeso</span>
          </button>
          <button className="d-flex align-items-center m-auto w-75 border-top border-end rounded my-5 btn"
            onClick={()=> r.push({ pathname: './oldRoute', query: {droute: JSON.stringify(user.percorsiFatti)} })}>
            <img src="./menu/percorsi.png" width={70} alt=''/>
            <span className='mx-2 my-0'>Guarda i percorsi terminati</span>
          </button>
          <button className="d-flex align-items-center m-auto w-75 border-top border-end rounded my-5 btn"
            onClick={()=> r.push({ pathname: './cronoReperti', query: {dreperti: JSON.stringify(user.reperti)} })}>
            <img src="./menu/collezionabili.png" width={70} alt=''/>
            <span className='mx-2 my-0'>Guarda i reperti raccolti</span>
          </button>
        </div>
      </div>
      

    </main>
  )
}
