import { useEffect, useState } from "react";
import { IoQrCode } from "react-icons/io5";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

import db from '@database';
import styles from '@/Home.module.css';
import useStore from "@store";
import Image from "next/image";

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
        <Image src={`/piano/${piano}-${sala.replaceAll(' ','-')}.webp`} width={250} height={250} className={styles.piano} priority/>
        <p className={`${styles.indizio} px-3 t-elite pt-2`}>{reperto.indizio}</p>
      </div>

      <Link href={'./scanQr'} className={`${styles.scan} bScan btn`}>
          <IoQrCode/>
      </Link>
      <p className={styles.scanText}>Una volta trovato il reperto scansiona il Qrcode corrispondente</p>
    </main>
  )
}
