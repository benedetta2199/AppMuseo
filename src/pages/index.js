import { useEffect, useState } from "react";
import styles from '@/Home.module.css'
import {getDoc, setDoc, doc } from "firebase/firestore";
import Form from 'react-bootstrap/Form';
import { useRouter } from "next/router";
import { Toast } from "react-bootstrap";
import {IoClose} from "react-icons/io5";
import Image from "next/image";

import db from '@database'
import useStore from "@store";
import logo from "@img/logo.webp"

export default function Home() {

  const r = useRouter();
  const inizializeUser = useStore((state) => state.inizializeUser);

  const loadFind = useStore((state) => state.loadFind);
  const loadRoute = useStore((state) => state.loadRoute);

  /*CARICA TUTTI I PERCORSI E I REPERTI DISPONIBILI*/
  useEffect(()=>{
    loadFind();
    loadRoute()
  },[]);

  const [textmail, onChangeMail] = useState("");
  const [textpassword, onChangePassword] = useState("");
  const [textnewmail, onChangeNewMail] = useState("");
  const [textnewpassword1, onChangeNewPassword1] = useState("");
  const [textnewpassword2, onChangeNewPassword2] = useState("");
  const [textToast,setTextToast] = useState('');
  const [show,setShow]=useState(false);
  
   /**CONTROLLA SE ESISTE L'UTENTE NEL DATABASE
    * APRE LA PAGINA DELL'UTENETE
    */
  async function checkUser() {
    findUser(textmail).then((utente)=>{
      if (utente.exists()) {
        if(utente.data().password==textpassword){
          inizializeUser(textmail, utente.data());
          r.push('./user');
        } else{
          setTextToast('Nessun utente è registrato con questa mail');
          setShow(true);
        }
      } else {
        setShowNU(true);
      }
    });
  }

  /**CONTROLLA SE LE PASSWORD SONO UGUALI, 
   * CONTROLLA CHE NON ESISTA UN UTENTE GIà REGISTRATO CON LA STESSA PASSWORD
   * SE I CONTROLLI VANNO A BUON FINE AGGIUNGE L'UTENTE
   * APRE LA PAGINA DELL'UTENTE */
  const checkRegistrati = () =>{
    if(textnewpassword1==textnewpassword2){
      findUser(textnewmail).then((utente)=>{
        console.log(utente);
        if (utente.exists()) {
          setTextToast('Un utente è già registrato con questa mail');
          setShow(true);
        } else {
          addUser(textnewmail,textnewpassword1);
          findUser(textnewmail)
            .then((utente)=>{ 
              useStore
              r.push('./user');
            });
        }
      });
    }else{
      setTextToast('Le due password non corrispondono');
      setShow(true);
    }
  }

   /**TROVA E RESTIRUISCE L'UTENTE DEL DATABASE */
   async function findUser(mail) {
    const docRef = doc(db, "user", mail);
    const utente = await getDoc(docRef);
    return utente;
  }
  /**AGGIUNGE L'UTENTE AL DATABASE */
  async function addUser(user, password) {
    const docRef = doc(db, "user", user);
    await setDoc(docRef, {password: password, percorsiFatti:[], punteggio:0, reperti:[]});
  }

  const [isAccedi, setIsAccedi] = useState(true);

  const accedi = <>
    <div>
      <p>Inserisci i tuoi dati ed accedi</p>
      <label htmlFor='inputMail1' hidden>Email</label>
      <Form.Control type="email" className={`${styles.input} m-auto mt-3`} id="inputMail1" placeholder='Email'
        value={textmail} onChange={(e) => onChangeMail(e.target.value)}/>
    </div>
    <div>
      <label htmlFor='inputPassword1' hidden>Password</label>
      <Form.Control type="password" className={`${styles.input}  m-auto mt-3`} id="inputPassword1" placeholder="Password"
        value={textpassword} onChange={(e) => onChangePassword(e.target.value)}/>
    </div>
    <button className="btn mt-4 gray t-abo" onClick={()=>checkUser()}>Accedi</button>
  </>

  const registrati =  <>
    <div>
      <p>Inserisci i tuoi dati e registrati</p>
      <label htmlFor='inputMail2' hidden>Email</label>
      <Form.Control type="email" className={`${styles.input} m-auto mt-3`} id="inputMail2" placeholder='Email'
        value={textnewmail} onChange={(e) => onChangeNewMail(e.target.value)}/>
    </div>
    <div>
      <label htmlFor='inputPassword2' hidden>Password</label>
      <Form.Control type="password" className={`${styles.input}  m-auto mt-3`} id="inputPassword2" placeholder="Password"
        value={textnewpassword1} onChange={(e) => onChangeNewPassword1(e.target.value)}/>
      <label htmlFor='inputPassword3' hidden>Conferma password</label>
      <Form.Control type="password" className={`${styles.input}  m-auto mt-3`} id="inputPassword3" placeholder="Conferma Password"
        value={textnewpassword2} onChange={(e) => onChangeNewPassword2(e.target.value)}/>
    </div>
    <button className="btn mt-4 gray t-abo" onClick={()=>checkRegistrati()}>Registrati</button>
  </>

  return (
    <main className={`${styles.main} lock-height`}>
      <Image src={logo} className={styles.logo} alt="" priority/>
      <h1 className="mt-2 d-flex align-items-end p-0 mx-4 my-3 pt-3"> Museo della Regina </h1>
      <p className="t-elite mx-auto w-75"> Scopri la verità nascosta tra i reperti </p>
      <div className={`${styles.form} container dgray shadow mt-3`}>
        <div className="d-flex justify-content-around">
          <a onClick={()=>setIsAccedi(true)}
            className={`btn border-bottom-0 m-0 t-abo ${isAccedi ? 'text-decoration-underline':'opacity-50'}`}>Accedi</a>
          <a onClick={()=>setIsAccedi(false)}
            className={`btn border-bottom-0 m-0 t-abo ${!isAccedi ? 'text-decoration-underline':'opacity-50'}`}>Registrati</a>
        </div>
        <hr className="mt-0"/>
        {isAccedi || accedi==null ? accedi : registrati}
      </div>

      <Toast show={show} onClose={()=>{setShow(false); setTextToast('')}} className='z-3 align-self-center'>
      <Toast.Header>
        <IoClose className='redT'/>
        <strong className="me-auto redT t-abo">Attenzione!</strong>
      </Toast.Header>
      <Toast.Body>{textToast}</Toast.Body>
    </Toast>
    </main>
  )
}

