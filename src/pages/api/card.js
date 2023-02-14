import { useState } from "react";
import ReactCardFlip from "react-card-flip";

import styles from '@/Component.module.css'

export default function Card(prop) {
  
  const {titolo, punteggio, altro, img, hue, contin, data={}} = prop;

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
                <button className={`btn btn-sm my-1 ${hue}`} onClick={()=>r.push({ pathname: './indizio', query: {id: data.id, idRoute: data.idRoute, 
                idUserRoute: data.idUserRoute, index: data.index, lenght: data.lenght, idRep: data.idRep}})}
                >Continua</button> 

 {/*onClick={()=>}r.push({ pathname: './indizio', query: {id: id, idRouter: it.id, idUserRoute: docRef.id, index: 0, lenght: it.route.reperti.length, idRep: next}});
  */}
                <button className={`btn border-light btn-sm`} onClick={()=>setIsFlipped(!isFlipped)}>Ruota la carta</button></>
            : <></>}
        </div>
    </ReactCardFlip>
  )
}