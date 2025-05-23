import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapView = ({ lat, lon, onDragMarker }) => {

   const handleDragEnd = (e) => {
    const { lat, lng } = e.target.getLatLng();
    onDragMarker(lat, lng);
  };
  
  return (
    <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={false} className="map-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[lat, lon]}
        draggable={true}
        eventHandlers={{
          dragend: handleDragEnd,
        }}
      >
        <Popup>You are here!</Popup>
      </Marker>
    </MapContainer>
  )
}

export default MapView