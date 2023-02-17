import dynamic from 'next/dynamic'

// import OpenStreetMap from './api/OpenStreetMap'
const OpenStreetMap = dynamic(() => import('./api/OpenStreetMap'), {
  ssr: false,
})

const index = () => {
  return (
    <>
      <OpenStreetMap />
    </>
  )
}

export default index
