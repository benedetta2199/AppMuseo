import React, { useState, useRef, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, LayerGroup, Circle, Popup, CircleMarker, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import db from '@database'
import styles from '@/Component.module.css'

const Map2 = () => {
  //const [center, setCenter] = useState({ lat: -4.043477, lng: 39.668205 })
  const ZOOM_LEVEL = 16;
  const mapRef = useRef();

  const placeLat = 44.14319687931616;
  const palceLng = 12.2445016982286;

  const center = [44.14319687931616, 12.2445016982286];

  const [position, setPosition] = useState([44.1418149, 12.2441983]);

    useEffect(() => {
      let i =0;
      const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
        i++;
        navigator.geolocation.getCurrentPosition(function(position) {
          console.log(i+'. '+position.coords.latitude+' '+position.coords.longitude);
          setPosition([position.coords.latitude, position.coords.longitude])
        });
      }, 2000);
    
      return () => clearInterval(intervalId); //This is important
    }, []);
  


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
        <Circle center={position} pathOptions={{ fillColor: '#718e92', fillOpacity: '0.5' }} radius={8} stroke={false}>
          <CircleMarker center={position} pathOptions={{ fillColor: '#031116', fillOpacity: '1' }} radius={3} stroke={false}/>
            <Popup>
              Questa è la <br /> tua posizione
            </Popup>
          </Circle>
        {/*<Marker position={position}>
          <Popup>
            Questa è la <br/> tua posizione
          </Popup>
  </Marker>*/}
      </MapContainer>
  </main>
                  
  )
}

export default Map2
