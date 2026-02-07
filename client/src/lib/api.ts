const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

import { getDefaultStore } from "jotai";
import { authAtom } from "../atoms/auth";

type ApiOptions = {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: any;
  token?: string;
};

const store = getDefaultStore();

export async function apiFetch(path: string, options: ApiOptions = {}) {
  const { method = "GET", body, token } = options;

  const auth = store.get(authAtom);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (auth.token) {
    headers.Authorization = `Bearer ${auth.token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.messsage || "Error en la API");
  }

  return data;
}
