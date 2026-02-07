import { atom } from "jotai";

export type AuthState = {
  email: string | null;
  token: string | null;
  isLoggedIn: boolean;
};

export const authAtom = atom<AuthState>({
  email: null,
  token: null,
  isLoggedIn: false,
});
