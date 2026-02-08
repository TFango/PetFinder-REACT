import { atom } from "jotai";

export type Pet = {
  id: string;
  name: string;
  imageUrl: string;
  location: string;
  lat: number;
  lng: number;
  status: "lost" | "found";
};

export type NearbyPet = {
  objectID: string;
  name: string;
  imageUrl: string;
  location?: string;
  _geoloc: {
    lat: number;
    lng: number;
  };
};

export const myPetsAtom = atom<Pet[]>([]);

export const nearbyPetsAtom = atom<NearbyPet[]>([]);

export const selectedPetAtom = atom<Pet | null>(null);
