import React, { useState, useRef, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, LayerGroup, Circle, Popup, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { IoLocate } from "react-icons/io5";

import db from '@database'
import stylesH from '@/Home.module.css'
import stylesC from '@/Component.module.css'

const Map2 = () => {
  //const [center, setCenter] = useState({ lat: -4.043477, lng: 39.668205 })
  const ZOOM_LEVEL = 16;
  const MINDISTANCE = 10;
  const [map, setMap] = useState(null);
  const mapRef = useRef();

  const myIcon = L.icon({
    iconUrl: '../loc.png',
    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [20, 30], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor
});

  const center = [43.96346569633796, 12.744251411105504]; 

  const [position, setPosition] = useState([43.96364140583398, 12.741056881742653]);

  useEffect(() => {
    let i =0;
    const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
      navigator.geolocation.getCurrentPosition(function(p) {
        setPosition([p.coords.latitude, p.coords.longitude]);
        const dist = L.latLng(position).distanceTo(center);
        if(dist<MINDISTANCE){
          console.log(dist);
        }
      });
    }, 2000);

    return () => clearInterval(intervalId); //This is important
  }, []);


  return (
  <>
    <div className={stylesC.map}>
     <MapContainer ref={setMap} center={center} zoom={ZOOM_LEVEL}>
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
        <Marker position={position} icon={myIcon}>
          <Popup>
            Questa ?? la <br/> tua posizione
          </Popup>
        </Marker>
      </MapContainer>
      </div>
    <button className={`${stylesH.scan} bScan btn`} 
      onClick={()=>{map.fitBounds([position, center]); }}>
      <IoLocate/>
    </button>
  </>
                  
  )
}

export default Map2
