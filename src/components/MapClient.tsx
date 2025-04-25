"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // ✅ Leaflet core
import "leaflet/dist/leaflet.css";

// Fix default marker icons in Next.js/Vercel
import "leaflet/dist/images/marker-shadow.png";

interface MapClientProps {
  center: [number, number];
  zoom?: number;
  markers?: { lat: number; lng: number; label: string }[];
  height?: string;
}

// ✅ Red marker icon
const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function MapClient({
  center,
  zoom = 13,
  markers = [],
  height = "200px"
}: MapClientProps) {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height, width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, i) => (
        <Marker key={i} position={[marker.lat, marker.lng]} icon={redIcon}>
          <Popup>{marker.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
