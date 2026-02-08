import { useState } from "react";
import { reverseGeocode } from "../lib/mapbox";
import { useAtom } from "jotai";
import { locationAtom } from "../atoms/useLocation";

export function useLocation(initialLat?: number, initialLng?: number) {
  const [lat, setLat] = useState(initialLat);
  const [lng, setLng] = useState(initialLng);
  const [locationText, setLocationText] = useState("");

  const [location, setLocation] = useAtom(locationAtom);

  async function setPosition(newLat: number, newLng: number) {
    setLat(newLat);
    setLng(newLng);

    try {
      const address = await reverseGeocode(newLat, newLng);
      setLocationText(address);
    } catch {
      setLocationText("Ubicación desconocida");
    }
  }

  async function setManualLocation(lat: number, lng: number) {
    setLocation({ lat, lng });
  }

  return {
    location,
    setManualLocation,
    lat,
    lng,
    locationText,
    setPosition,
    setLocationText,
  };
}
