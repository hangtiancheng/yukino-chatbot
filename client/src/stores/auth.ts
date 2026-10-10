import { atom } from "jotai";

export const tokenAtom = atom<string | null>(localStorage.getItem("token"));

export const isAuthenticatedAtom = atom((get) => Boolean(get(tokenAtom)));

export const setTokenAtom = atom(null, (_get, set, newToken: string | null) => {
  set(tokenAtom, newToken);
  if (newToken) {
    localStorage.setItem("token", newToken);
  } else {
    localStorage.removeItem("token");
  }
});
