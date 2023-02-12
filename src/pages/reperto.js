import { useState } from "react";

import styles from '@/Home.module.css'
import circle from '@/Circle.module.css'

export default function Home() {
  
  const [text, setText] = useState('Pithos');
  const [color, setColore] = useState('yellow');
  const [data, setData] = useState('V secolo a.C.');
  const [desc, setDesc] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt lacus quis justo scelerisque bibendum. Proin ornare enim eu arcu rhoncus, vitae lobortis sapien vestibulum. Cras vel urna nibh. Aliquam vitae eros et leo porttitor vehicula. Fusce vulputate, nibh molestie tempus iaculis, arcu mauris ullamcorper ligula, sed ornare velit quam quis orci. '
  )
  const [isGame, setIsGame] = useState(false);

  return (
    <main className={styles.main}>
      <div className={circle.c1}></div>
      <div className="position-relative mt-4">
         <h1 className={styles.title}>{text}</h1>
         <p className="t-elite">{data}</p>
        <img src="./reperti/pithos.png" className={`${styles.reperto} shadowR`}/>
        <p className="px-3">{desc}</p>
      </div>

      {
        isGame 
          ? <button className="btn text-light gray t-abo">  Torna al profilo </button>
          : <>
            <button className={`${color} btn text-light t-abo mb-2`}>  Accumula più punti  </button>
            <button className="btn text-light gray t-abo">  Scopri il prossimo indizio </button>
            </>
      }
      
    </main>
  )
}
