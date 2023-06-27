import { useState } from "react";
import ReactCardFlip from "react-card-flip";

import useStore from "@store";
import styles from '@/Component.module.css'
import { useRouter } from "next/router";

export default function Card(prop) {
  
  const {titolo, punteggio, altro, img, hue, contin, idR, idUR} = prop;

  const r = useRouter();

  const inizializeCurrentRoute = useStore((state) => state.inizializeCurrentRoute);
  const getReperto = useStore((state) => state.getReperto);

  const [isFlipped, setIsFlipped] = useState(false);

  const click = async () => {
    await inizializeCurrentRoute(idUR, idR);
    const rep=getReperto();
    console.log(rep);
    if(rep.esterno){
      r.replace('/map');
    } else{
      r.replace('/indizio');
    }
    
  }

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" >
        <div className={`${styles.cardF} text-light`} onClick={()=>setIsFlipped(!isFlipped)}
          style={{backgroundColor: 'var(--d'+hue+')', backgroundImage: 'url(./percorsi/'+img+')', backgroundSize:'cover', backgroundRepeat:'no-repeat'}}>
          <h2 className={`${styles.title} w-100`}>{titolo}</h2>
        </div>

        <div className={`${styles.cardB}`} onClick={contin? ()=>{} :()=>{setIsFlipped(!isFlipped)}}
          style={{background: 'var(--d'+hue+')'}}>
            <p className="t-elite mb-1">Terminato il {contin? (altro+'').substring(0, 4)+'% del percorso' : ' \n '+ altro}</p>
            {contin
              ? <></>
              : <h2 className={`${styles.title}`}>{titolo}</h2>
            }
            <div className={`${styles.point} t-elite`}>Punteggio: {punteggio}</div>
            {contin
            ? <>

                <button className={`btn btn-sm my-1 ${hue}`} onClick={()=> click()}>
                  Continua
                </button> 
                {/*<button className={`btn btn-sm my-1 ${hue}`} href='./indizio' onClick={()=> inizializeCurrentRoute(idUR, idR)}>
                  Continua
                </button>*/}

                <button className={`btn border-light btn-sm`} onClick={()=>setIsFlipped(!isFlipped)}>Ruota la carta</button></>
            : <></>}
        </div>
    </ReactCardFlip>
  )
}