import styles from '@/Home.module.css';
import { useRouter } from 'next/router';
import {IoChevronBackCircleSharp} from "react-icons/io5";

import useStore from "@store";

export default function Extra() {

  const r = useRouter();
  const data = r.query.data || '';

  
  const idRep = useStore((state) => state.currentIdReperto);
  const user = useStore((state) => state.user);
  const currentRoute = useStore((state) => state.currentRoute);
  const restore = useStore((state) => state.restore);

  return (
    <>
      <iframe id="inlineFrameExample"
        className={styles.iframe}    
        allow="geolocation 'src'; microphone 'src'; camera 'src';"
        src={"https://benedetta2199.github.io/ARapp/"+data}>
      </iframe>
           
      <button className={`btn bBack dgray`} onClick={()=>{restore(user,currentRoute,idRep); r.back();}}>
        <IoChevronBackCircleSharp></IoChevronBackCircleSharp>Back
      </button>
    </>
      
  )
}

