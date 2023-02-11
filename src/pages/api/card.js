import { useState } from "react";
import ReactCardFlip from "react-card-flip";

import styles from '@/Component.module.css'

export default function Card(prop) {
  
  const {titolo, punteggio, altro, img, hue, contin} = prop;
  
  const [text, setText] = useState('Piano 1');
  const [desc, setDesc] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt lacus quis justo scelerisque bibendum. Proin ornare enim eu arcu rhoncus, vitae lobortis sapien vestibulum. Cras vel urna nibh. Aliquam vitae eros et leo porttitor vehicula. Fusce vulputate, nibh molestie tempus iaculis, arcu mauris ullamcorper ligula, sed ornare velit quam quis orci. '
  )

  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" >
        <div className={`${styles.cardF} text-light`} onClick={()=>setIsFlipped(!isFlipped)}
          style={{background: 'url('+img+')', backgroundSize:'cover', backgroundRepeat:'no-repeat'}}>
          <h2 className={`${styles.title}`}>{titolo}</h2>
        </div>

        <div className={`${styles.cardB}`} onClick={contin? ()=>{} :()=>{setIsFlipped(!isFlipped)}}
          style={{background: 'var(--d'+hue+')'}}>
            <p className="t-elite mb-1">Terminato il {contin? ' ':<br/>}{altro}{contin? '% del percorso':''}</p>
            {contin
              ? <></>
              : <h2 className={`${styles.title}`}>{titolo}</h2>
            }
            <div className={`${styles.point} t-elite`}>Punteggio: {punteggio}</div>
            {contin
            ? <>
                <button className={`btn btn-sm my-1 ${hue}`}>Continua</button> 
                <button className={`btn border-light btn-sm`} onClick={()=>setIsFlipped(!isFlipped)}>Ruota la carta</button></>
            : <></>}
        </div>
    </ReactCardFlip>
  )
}