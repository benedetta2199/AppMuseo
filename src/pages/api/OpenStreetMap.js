import React, { useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, LayerGroup, Circle, Popup, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import db from '@database'
import styles from '@/Component.module.css'

const Map2 = () => {
  //const [center, setCenter] = useState({ lat: -4.043477, lng: 39.668205 })
  const ZOOM_LEVEL = 16;
  const mapRef = useRef();

  const placeLat = 44.14319687931616;
  const palceLng = 12.2445016982286;

  const center = [44.14319687931616, 12.2445016982286]
  


  return (
  <main className={`${styles.main} lock-height`}>
     <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <LayerGroup>
          <Circle center={center} pathOptions={{ fillColor: '#37c885', fillOpacity: '0.2' }} radius={90} stroke={false} />
          <Circle center={center} pathOptions={{ fillColor: '#e9a901',fillOpacity: '0.4'}} radius={60} stroke={false} />
          <Circle
            center={center}
            pathOptions={{ fillColor: '#D62F2F', fillOpacity: '0.6' }}
            radius={30}
            stroke={false}
          />
          <CircleMarker center={center} pathOptions={{ fillColor: '#00aab7', fillOpacity: '1' }} radius={5} stroke={false}>
            <Popup>
              Il tuo tesoro <br /> si trova qui!
            </Popup>
          </CircleMarker>
        </LayerGroup>
        {location.loaded && !location.error && (
          <Marker
            position={[
              location.coordinates.lat,
              location.coordinates.lng,
            ]}
          ></Marker>
        )}
      </MapContainer>
  </main>
                  
  )
}

export default Map2
