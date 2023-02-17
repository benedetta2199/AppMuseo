import dynamic from 'next/dynamic'

import styles from '@/Home.module.css'

// import OpenStreetMap from './api/OpenStreetMap'
const OpenStreetMap = dynamic(() => import('./api/OpenStreetMap'), {
  ssr: false,
})

const index = () => {
  return (
    <main className={`${styles.main} lock-height`}>
      <OpenStreetMap />
    </main>
  )
}

export default index
