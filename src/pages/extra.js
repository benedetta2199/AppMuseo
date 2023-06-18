import styles from '@/Home.module.css';
import { useRouter } from 'next/router';
import {IoChevronBackCircleSharp} from "react-icons/io5";

export default function Extra() {

  const r = useRouter();
  const src = "https://benedetta2199.github.io/ARapp/"+r.query.data;

  return (
    <>
           
      <button className={`btn bBack`} onClick={()=>r.back()}><IoChevronBackCircleSharp></IoChevronBackCircleSharp>Back</button>

      <iframe id="inlineFrameExample"
        className={styles.iframe}    
        allow="camera;microphone"
        src={src}>
      </iframe>
    </>
  )
}

