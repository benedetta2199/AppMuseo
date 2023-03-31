import React, { useState, useRef, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, LayerGroup, Circle, Popup, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { IoLocate } from "react-icons/io5";
import { useRouter } from 'next/router';

import stylesH from '@/Home.module.css'
import stylesC from '@/Component.module.css'
import useStore from "@store";

const Map2 = (props) => {

  const getReperto = useStore((state) => state.getReperto);
  const reperto = getReperto() || {};


  //const [center, setCenter] = useState({ lat: -4.043477, lng: 39.668205 })
 // const {latitudine, longitudine} = props
  const latitudine = reperto.coordinate.latitude;
  const longitudine = reperto.coordinate.longitude;
  const ZOOM_LEVEL = 16;
  const MINDISTANCE = 10;
  const [map, setMap] = useState(null);
  /**posizione destinazione tesoro */
  const center = [latitudine, longitudine]; 

  const r = useRouter();

  const myIcon = L.icon({
    iconUrl: '../loc.png',
    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [20, 30], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor
});

  /*COORD MUSEO 43.96362390345784, 12.741044864931098*/
  const [position, setPosition] = useState([43.96362390345784, 12.741044864931098]);

  useEffect(() => {
    let i =0;
    const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
      navigator.geolocation.getCurrentPosition(function(p) {
        setPosition([p.coords.latitude, p.coords.longitude]);
        /*console.log(p.coords.latitude + '-' + p.coords.longitude);
        const dist = L.latLng(position).distanceTo(center);*/
        const dist = distance(position, center);
        console.log(position + '-' + dist);
        if(dist<MINDISTANCE){
          console.log(dist);
          r.push('/luogo');
        }
      });
    }, 2000);

    return () => clearInterval(intervalId); //This is important
  }, []);

  const distance = (p1, p2) =>{
    const lat1Radians = p1[0] * Math.PI / 180;
    const lng1Radians = p1[1] * Math.PI / 180;
    const lat2Radians = p2[0] * Math.PI / 180;
    const lng2Radians = p2[1] * Math.PI / 180;

    const r = 6376.5 * 1000; //raggio della terra in metri
    const x1 = r * Math.cos(lat1Radians) * Math.cos(lng1Radians);
    const y1 = r * Math.cos(lat1Radians) * Math.sin(lng1Radians);
    const z1 = r * Math.sin(lat1Radians);
    const x2 = r * Math.cos(lat2Radians) * Math.cos(lng2Radians);
    const y2 = r * Math.cos(lat2Radians) * Math.sin(lng2Radians);
    const z2 = r * Math.sin(lat2Radians);

    return Math.sqrt(Math.pow((x2 - x1),2) + Math.pow((y2 - y1),2) + Math.pow((z2 - z1),2));
  }


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
            Questa è la <br/> tua posizione
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
