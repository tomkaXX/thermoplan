"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapClientProps {
  center: [number, number];
  zoom?: number;
  markers?: { lat: number; lng: number; label: string }[];
  height?: string;
}

export default function MapClient({ center, zoom = 13, markers = [], height = "200px" }: MapClientProps) {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height, width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, i) => (
        <Marker key={i} position={[marker.lat, marker.lng]}>
          <Popup>{marker.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
