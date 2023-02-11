import { useState } from "react";
import styles from '@/Home.module.css'
import { collection, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
import Form from 'react-bootstrap/Form';
import { useRouter } from "next/router";
import { Toast } from "react-bootstrap";
import {IoClose} from "react-icons/io5";

import db from '@database'

export default function Home() {

  const r = useRouter();

  const [textmail, onChangeMail] = useState("");
  const [textpassword, onChangePassword] = useState("");
  const [textnewmail, onChangeNewMail] = useState("");
  const [textnewpassword1, onChangeNewPassword1] = useState("");
  const [textnewpassword2, onChangeNewPassword2] = useState("");
  const [showNU,setShowNU] = useState(false);
  const [showNP, setShowNP] = useState(false);
  
  async function checkUser() {
    const docRef = doc(db, "user", textmail);
    const utente = await getDoc(docRef);
    if (utente.exists()) {
      if(utente.data().password==textpassword){
        r.push({ pathname: './user', query: {id: textmail, data: JSON.stringify(utente.data())} });
      } else{
        setShowNP
      }
    } else {
      setShowNU(true);
    }
  }

  /*MANCANO FUNZIONALITà REGISTRAZIONE (controllo utente inserito, add db, log)*/

  const [isAccedi, setIsAccedi] = useState(true);

  const accedi = <>
    <div>
      <p>Inserisci i tuoi dati ed accedi</p>
      <Form.Control type="email" className={`${styles.input} m-auto mt-3 text-light`} id="inputMail1" placeholder='Email'
        value={textmail} onChange={(e) => onChangeMail(e.target.value)}/>
    </div>
    <div>
      <Form.Control type="password" className={`${styles.input}  m-auto mt-3 text-light`} id="inputPassword1" placeholder="Password"
        value={textpassword} onChange={(e) => onChangePassword(e.target.value)}/>
    </div>
    <button className="btn mt-4 dred t-abo" onClick={()=>checkUser()}>Accedi</button>
  </>

  const registrati =  <>
    <div>
      <p>Inserisci i tuoi dati e registrati</p>
      <Form.Control type="email" className={`${styles.input} m-auto mt-3 text-light rounded`} id="inputMail2" placeholder='Email'
        value={textnewmail} onChange={(e) => checkRegistrati(e.target.value)}/>
    </div>
    <div>
      <Form.Control type="password" className={`${styles.input}  m-auto mt-3 text-light`} id="inputPassword2" placeholder="Password"
        value={textnewpassword1} onChange={(e) => onChangeNewPassword1(e.target.value)}/>
      <Form.Control type="password" className={`${styles.input}  m-auto mt-3 text-light`} id="inputPassword3" placeholder="Conferma Password"
        value={textnewpassword2} onChange={(e) => onChangeNewPassword2(e.target.value)}/>
    </div>
    <button className="btn mt-4 dred t-abo" onClick={()=>registrati()}>Registrati</button>
  </>

  return (
    <main className={`${styles.main} lock-height`}>
      <img src="./logo.png" className={styles.logo} alt="R"/>
      <h1 className="mt-2 d-flex align-items-end p-0 mx-4 my-3 pt-3"> Museo della Regina </h1>
      <p className="t-elite mx-auto w-75"> Scopri la verità nascosta tra i reperti </p>
      <div className={`${styles.form} container gray shadow mt-3`}>
        <div className="d-flex justify-content-around">
          <a onClick={()=>setIsAccedi(true)}
            className={`btn border-bottom-0 m-0 t-abo ${isAccedi ? 'text-decoration-underline':'opacity-50'}`}>Accedi</a>
          <a onClick={()=>setIsAccedi(false)}
            className={`btn border-bottom-0 m-0 t-abo ${!isAccedi ? 'text-decoration-underline':'opacity-50'}`}>Registrati</a>
        </div>
        <hr className="mt-0"/>
        {isAccedi || accedi==null ? accedi : registrati}
      </div>

      <Toast show={showNU} onClose={()=>setShow(false)} className='z-3'>
      <Toast.Header>
        <IoClose className='redT'/>
        <strong className="me-auto redT t-abo">Attenzione!</strong>
      </Toast.Header>
      <Toast.Body>Nessun utente è registrato con questa mail...</Toast.Body>
    </Toast>

    <Toast show={showNP} onClose={()=>setShow(false)} className='z-3'>
      <Toast.Header>
        <IoClose className='redT'/>
        <strong className="me-auto redT t-abo">Attenzione!</strong>
      </Toast.Header>
      <Toast.Body>Utente e passwort non corrisponono...</Toast.Body>
    </Toast>
    </main>
  )
}

