import { useState } from "react";
import { IoQrCode } from "react-icons/io5";

import styles from '@/Home.module.css'

export default function Home() {
  
  const [text, setText] = useState('Piano 1');
  const [desc, setDesc] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt lacus quis justo scelerisque bibendum. Proin ornare enim eu arcu rhoncus, vitae lobortis sapien vestibulum. Cras vel urna nibh. Aliquam vitae eros et leo porttitor vehicula. Fusce vulputate, nibh molestie tempus iaculis, arcu mauris ullamcorper ligula, sed ornare velit quam quis orci. '
  )

  return (
    <main className={`${styles.main} yellow lock-height`}>
      <div className={styles.obliquo}></div>
      <div className="mt-4 text-dark position-relative">
         <h1 className="mb-5 pb-3"> Trova il reperto </h1>
         <h2 className={`${styles.title} h6 text-end px-5`}>{text}</h2>
        <img src="./piano/1_domus-aurea.png" className={styles.piano}/>
        <p className={`${styles.indizio} px-3 t-elite small`}>{desc}</p>
      </div>

      <button className={`${styles.scan} btn`}><IoQrCode/></button>
      <p className={styles.scanText}>Una volta trovato il reperto scansiona il Qrcode corrispondente</p>
      
    </main>
  )
}
