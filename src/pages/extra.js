import styles from '@/Home.module.css';
import { useRouter } from 'next/router';
import {IoChevronBackCircleSharp} from "react-icons/io5";

import { JigsawPuzzle } from 'react-jigsaw-puzzle/lib'
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css'

export default function Extra() {

  const r = useRouter();
  const data = r.query.data
  let element = {}

  console.log(data.substring('?puzzle='.length));
  
  switch(data.substring('?puzzle='.length)){
    case 'fusaiola':
      element = {src: 'filatura', row: 4, columns: 3};
      break;
  }
  


  return (
    <>
      {data.includes('puzzle')
        ?
          <>
            <h1>Ricomponi il puzzle e scopri l'immagine</h1>
            <div className='puzzle-container'>
              <JigsawPuzzle
                imageSrc={'/puzzle/'+element.src+'.webp'}
                rows={element.row}
                columns={element.columns}
                onSolved={() => alert('Solved!')}
              />
            </div>
          </>
        :
          <iframe id="inlineFrameExample"
            className={styles.iframe}    
            allow="camera;microphone"
            src={"https://benedetta2199.github.io/ARapp/"+data}>
          </iframe>
      }
           
      <button className={`btn bBack dgray`} onClick={()=>r.back()}><IoChevronBackCircleSharp></IoChevronBackCircleSharp>Back</button>
    </>
      
  )
}

