import { atom } from "jotai";

export type UserState = {
  id: string | null;
  name: string | "";
  location: string | "";
};

export const userAtom = atom<UserState | null>(null);
