import { useState} from "react";
import { useRouter } from "next/router";
import { IoChevronDownOutline, IoHome } from "react-icons/io5";

import useStore from "@store";
import styles from '@/Home.module.css'

export default function CronoReperti() {
  const r = useRouter();
  const reperti = useStore((state) => state.cronologiaReperti);

  console.log(reperti);
 
  const [text, setText] = useState('');
  const [anno, setAnno] = useState('');
  const [img, setImg] = useState('');
  const [desc, setDesc] = useState('');
  const [colore, setColore] = useState('gray');
  const [index, setIndex] = useState(null);

  const setElement = (i) =>{
    if(reperti.length>0){
      setIndex(i);
      setText(reperti[i].nome);
      setAnno(reperti[i].anno);
      setImg(reperti[i].img+'.webp');
      setDesc(reperti[i].descrizione);
      setColore(reperti[i].colore);
    }
  }

  return (
    <main className={`${styles.main} ${colore} pt-2 lock-height`}>
      <h1>Reperti raccolti</h1>
        <div className={`${styles.vertical} white rounded ps-1`}>
          {reperti.map((item, i) =>{
              return (<a onClick={()=>setElement(i)} key={i}>
                      <img src={item.img+'.webp'} alt={item.nome} className={`${index==i ? styles.active : 'white'} ${item.colore} w-100 p-2 pe-3 my-2`}/>
                    </a>)
            })
          }
          {reperti.length>5 ?<IoChevronDownOutline className={styles.down}/> : <></>}
        </div>
        <div className={`${styles.verticalReperto}`}>
          <img src={img} className={`w-100 p-2 shadowR`} alt={text}/>
          <div>
            <span className="h2 t-abo">{text}</span>
            <p className="t-elite ps-2 m-0">{anno}</p>
            <p className="small px-2 text-justify">{desc}</p>
          </div>
          
        </div>    

        <button className='btn bHome' onClick={()=>r.back()}>
          <IoHome className={`${colore}T`}/>
          <span hidden>Torna alla home</span>
        </button>  
    </main>
  )
}