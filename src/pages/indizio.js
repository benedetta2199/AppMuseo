import { IoQrCode } from "react-icons/io5";
import Link from "next/link";

import styles from '@/Home.module.css';
import useStore from "@store";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";

export default function Home() {

  /*da rivedere*/
  const i = useStore((state) => state.currentIdReperto);
  const getReperto = useStore((state) => state.getReperto);
  const reperto = getReperto() || {};
  const piano = reperto.piano || '';
  const sala = reperto.sala || '';

  return (
    <main className={`${styles.main} ${reperto.colore} lock-height`}>
      <div className={styles.obliquo}></div>
      <div className="mt-4 text-dark position-relative">
         <h1 className="mb-5 pb-3"> Trova il reperto </h1>
         <h2 className={`${styles.title} h6 text-end px-5`}>Piano {reperto.piano}</h2>
        <Image src={`/piano/${piano}-${reperto.colore}-${sala.replaceAll(' ','')}.webp`} alt={piano + ' ' + sala} width={250} height={250} className={styles.piano} priority/>
        <p className={`${styles.indizio} px-3 t-elite pt-2`}>{reperto.indizio}</p>
      </div>

      <div className={`${styles.scan} d-flex`} >
         <Link href={'./scanQr'} className={`bScan btn`}>
            <IoQrCode/>
          </Link>
          <p className="text-start ms-2 my-0">Una volta trovato il reperto scansiona il Qrcode corrispondente</p>
      </div>
      <Row >
        <Col sm={2}>
         
        </Col>
        <Col sm={10}>
          
        </Col>
      </Row>
      
      
    </main>
  )
}
