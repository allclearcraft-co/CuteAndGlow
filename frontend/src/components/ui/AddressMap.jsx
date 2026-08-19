import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

import { useState } from "react";

function DraggableMarker({ setCoordinates }) {
  const [position, setPosition] = useState([28.6139, 77.209]);

  useMapEvents({
    click(e) {
      const pos = [e.latlng.lat, e.latlng.lng];

      setPosition(pos);

      setCoordinates({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      });
    },
  });

  return (
    <Marker
      draggable
      position={position}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;

          const latlng = marker.getLatLng();

          setPosition([latlng.lat, latlng.lng]);

          setCoordinates({
            latitude: latlng.lat,
            longitude: latlng.lng,
          });
        },
      }}
    />
  );
}

export default function AddressMap({ setCoordinates }) {
  return (
    <MapContainer
      center={[28.6139, 77.209]}
      zoom={14}
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "10px",
      }}
    >
      <TileLayer
        attribution="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <DraggableMarker setCoordinates={setCoordinates} />
    </MapContainer>
  );
}
