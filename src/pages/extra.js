import styles from '@/Home.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {IoChevronBackCircleSharp} from "react-icons/io5";

import { JigsawPuzzle } from 'react-jigsaw-puzzle/lib'
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css'
import useStore from "@store";

export default function Extra() {

  const r = useRouter();
  const data = r.query.data || '';
  let element = {};
  const [win, setWin] = useState("Ricomponi il puzzle e scopri l'immagine");

  
  const idRep = useStore((state) => state.currentIdReperto);
  const user = useStore((state) => state.user);
  const currentRoute = useStore((state) => state.currentRoute);
  const restore = useStore((state) => state.restore);

  console.log(idRep);
  
  switch(data.substring('?puzzle='.length)){
    case 'fusaiola':
      element = {src: 'filatura', row: 4, columns: 3};
      break;
  }
  


  return (
    <>
      {data.includes('puzzlesss')
        ?
          <>
            <h1>{win}</h1>
            <div className='puzzle-container'>
              <JigsawPuzzle
                imageSrc={'/puzzle/'+element.src+'.webp'}
                rows={element.row}
                columns={element.columns}
                onSolved={() => setWin('Congratulazioni!')}
              />
            </div>
          </>
        :
          <iframe id="inlineFrameExample"
            className={styles.iframe}    
            allow="geolocation 'src'; microphone 'src'; camera 'src';"
            src={"https://benedetta2199.github.io/ARapp/"+data}>
          </iframe>
      }
           
      <button className={`btn bBack dgray`} onClick={()=>{restore(user,currentRoute,idRep); r.back();}}>
        <IoChevronBackCircleSharp></IoChevronBackCircleSharp>Back
      </button>
    </>
      
  )
}

