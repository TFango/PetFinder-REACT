import { atom } from "jotai";

export type LocationState = {
  lat: number | null;
  lng: number | null;
};

export const locationAtom = atom<LocationState>({
  lat: null,
  lng: null,
});
