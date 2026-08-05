// O singura functie pentru toate cererile catre backend: apiFetch.
// - Pune automat tokenul JWT in header.
// - La 401 incearca o data sa refacuiasca tokenul si re-trimite cererea.
// - La eroare arunca Error cu mesajul de la backend.
//
// Exemple:
//   const products = await apiFetch<ProductsListResponse>("/api/products");
//   const tokens = await apiFetch<AuthResponse>("/api/auth/login", {
//     method: "POST",
//     body: { email, password },
//   });

import type { AuthResponse } from "@/types/api";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from "./tokenStorage";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8082";

export type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  query?: { [key: string]: string | number };   // [key: string ] ??
};

type Headers = { [key: string]: string };

export async function apiFetch<T>(path: string, options: ApiOptions = {}): Promise<T> {
  // 1. URL cu query params (daca exista)
  let url = BASE_URL + path;
  if (options.query) {
    const params = new URLSearchParams();
    for (const key in options.query) {
      params.append(key, String(options.query[key]));
    }
    url += "?" + params;
  }

  // 2. Headers cu tokenul JWT (daca exista)
  const headers: Headers = { "Content-Type": "application/json" };
  const token = getAccessToken();
  if (token) headers.Authorization = "Bearer " + token;

  const init: RequestInit = {
    method: options.method || "GET",
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  };

  // 3. Trimite cererea
  let response = await fetch(url, init);

  // 4. Daca 401 si nu suntem deja pe /api/auth/* — incearca refresh si re-trimite
  if (response.status === 401 && !path.startsWith("/api/auth/")) {
    const ok = await tryRefresh();
    if (ok) {
      headers.Authorization = "Bearer " + getAccessToken();
      response = await fetch(url, init);
    } 
  }

  // 5. Citeste raspunsul
  if (response.status === 204) return undefined as T;
  const data = await response.json();
  if (!response.ok) 
    throw {
  message: data?.message || "Eroare la cerer",
  status: response.status,

  };
  return data as T;
}

async function tryRefresh(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  const response = await fetch(BASE_URL + "/api/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    clearTokens();
    return false;
  }

  // if (response.status === 409){
  // }

  const data: AuthResponse = await response.json();
  saveTokens(data.accessToken, data.refreshToken);
  return true;
}
