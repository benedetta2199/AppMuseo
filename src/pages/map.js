import dynamic from 'next/dynamic'

import styles from '@/Home.module.css'
import useStore from "@store";

// import OpenStreetMap from './api/OpenStreetMap'
const OpenStreetMap = dynamic(() => import('./api/OpenStreetMap'), {
  ssr: false,
})

const getReperto = useStore((state) => state.getReperto);
const reperto = getReperto() || {};

const index = () => {
  return (
    <main className={`${styles.main} lock-height`}>
      <OpenStreetMap lat={reperto.latitudine} long={reperto.longitudine}/>
    </main>
  )
}

export default index
