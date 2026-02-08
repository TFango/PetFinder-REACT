import { atom } from "jotai";

export type AuthState = {
  email: string | null;
  token: string | null;
  isLoggedIn: boolean;
};

const AUTH_STORAGE_KEY = "auth";

function getInitialAuth(): AuthState {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) {
    return { token: null, isLoggedIn: false, email: "" };
  }

  try {
    return JSON.parse(stored);
  } catch {
    return { token: null, isLoggedIn: false, email: "" };
  }
}

export const authWithStorageAtom = atom(
  (get) => get(authAtom),
  (_get, set, newAuth: AuthState) => {
    set(authAtom, newAuth);
    localStorage.setItem("auth", JSON.stringify(newAuth));
  },
);

export const authAtom = atom<AuthState>(getInitialAuth());
