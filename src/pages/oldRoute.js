import { useRouter } from "next/router";
import { IoHome } from "react-icons/io5";
import Card from "./api/card";

import useStore from "@store";
import styles from '@/Home.module.css'

export default function Home() {
  const r = useRouter();
  const routes = useStore((state) => state.percorsiTerminati);

  return (
    <main className={`${styles.main} lock-height`}>
      <h1>Visualizza i percorsi terminati</h1>
      <p>Clicca su un percorso per vedere i dettagli</p>
      <div className="d-flex flex-wrap justify-content-around">
        {routes.map((item, i) =>{
            return (
              <div className='mt-3' key={i}>
                <Card titolo={item.nome} img={item.img} punteggio={item.punteggio} altro={item.data} hue={item.hue} contin={false}/>
              </div>
            )
          })
        }
      </div>
      <button className='btn bHome gray' onClick={()=>r.back()}>
          <IoHome className="whiteT"/>
          <span hidden>Torna alla home</span>
        </button>  
    </main>
  )
}
