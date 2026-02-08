import React from "react";

import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

type Props = {
  lat: number;
  lng: number;
  onChange: (lat: number, lng: number) => void;
};

export function PetMap({ lat, lng, onChange }: Props) {
  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      initialViewState={{
        latitude: lat,
        longitude: lng,
        zoom: 14,
      }}
      style={{ width: "100%", height: 300 }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onClick={(e) => {
        onChange(e.lngLat.lat, e.lngLat.lng);
      }}
    >
      <Marker latitude={lat} longitude={lng} />
    </Map>
  );
}
