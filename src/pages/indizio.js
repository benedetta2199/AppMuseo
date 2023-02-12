import { useState } from "react";
import { IoQrCode } from "react-icons/io5";

import styles from '@/Home.module.css'

export default function Home() {
  
  const id='admin@admin.com';
  const rep = {anno: '', colore:'', descrizione:'', img:'', indizio:'', nome:'',piano:'',sala:''};
  const idRep = 'M8llre6QsY72iM0L9Q2V';
  const [text, setText] = useState('');
  const [img, setImg] = useState('');
  const [colore, setColore] = useState('');
  const [desc, setDesc] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt lacus quis justo scelerisque bibendum. Proin ornare enim eu arcu rhoncus, vitae lobortis sapien vestibulum. Cras vel urna nibh. Aliquam vitae eros et leo porttitor vehicula. Fusce vulputate, nibh molestie tempus iaculis, arcu mauris ullamcorper ligula, sed ornare velit quam quis orci. '
  )

  try {
    const temp = JSON.parse(rep);
    setText(temp.piano);
    setColore(temp.colore);
    setDesc(temp.indizio);
    setImg(rep.piano+'_'+rep.stanza.replaceAll(' ','-')+'.png');

  } catch(e) {
    /*const rep = {anno: '', colore:'', descrizione:'', img:'', indizio:'', nome:'',piano:'',sala:''};*/
  }
  

  return (
    <main className={`${styles.main} ${colore} lock-height`}>
      <div className={styles.obliquo}></div>
      <div className="mt-4 text-dark position-relative">
         <h1 className="mb-5 pb-3"> Trova il reperto </h1>
         <h2 className={`${styles.title} h6 text-end px-5`}>{text}</h2>
        <img src={`./piano/${img}`} className={styles.piano}/>
        <p className={`${styles.indizio} px-3 t-elite small`}>{desc}</p>
      </div>

      <button className={`${styles.scan} btn`} onClick={()=> r.push({ pathname: './scanQr', query: {id: id,idRep: idRep, rep: rep} })}><IoQrCode/></button>
      <p className={styles.scanText}>Una volta trovato il reperto scansiona il Qrcode corrispondente</p>
      
    </main>
  )
}
