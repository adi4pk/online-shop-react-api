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
  query?: { [key: string]: string | number };   // --> a new object with one property and value string | number;
  //[key: string] -- this says: the key of obj query can be any value and is a STRING
};

type Headers = { [key: string]: string };
// an object with any header name as a key;


    // Funcția returnează un Promise<> care conține un obiect de tip <T>.
export async function apiFetch<T>(path: string, options: ApiOptions = {}): Promise<T> {
  // 1. URL cu query params (daca exista)
  let url = BASE_URL + path;
  if (options.query) {
    const params = new URLSearchParams();   //object with behaviour -- params devine un obiect care stie regulile de construire ale unui query string
    for (const key in options.query) {                //for...in - returns the [KEY] from a dictionary    | for...of - returns the [value] from a dictionary
      params.append(key, String(options.query[key]));       //acces the value using [key] - options.query[key] -> returns the value;
    // -> "key=value&key=value..."
    }

    //"?" - este adaugat o singura data, dupa ce toate perechile au fost puse deja in params.
    // dupa ? incepe query string-ul
    url += "?" + params;
  }

  // 2. Headers cu tokenul JWT (daca exista)
  const headers: Headers = { ["Content-Type"]: "application/json" };
    // representation header is used to indicate 
    // the original media type of a resource before any content encoding is applied.

  const token = getAccessToken();
  if (token) headers.Authorization = "Bearer " + token;
  //headers.xyz would also work - we declared that headers can have any key, and it must be a string.

  const init: RequestInit = {
    method: options.method || "GET",
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      //if options body has any value --> stringify it.
  };

  // 3. Trimite cererea
  let response = await fetch(url, init);  // first initial fetch()

  // 4. Daca 401 si nu suntem deja pe /api/auth/* — incearca refresh si re-trimite
  // !path.startsWith("/api/auth") -- avoid infinite loop
  if (response.status === 401 && !path.startsWith("/api/auth/")) {
    const ok = await tryRefresh(); //use it to give refreshToken to server -> server sends accessToken back.
    // once accesToken is received --> try getAccessToken(); again
    if (ok) {
      headers.Authorization = "Bearer " + getAccessToken();
      response = await fetch(url, init); //fetch after refresh token - tryRefresh();
    } 
  }

  // 5. Citeste raspunsul
  // cod 204 -> no body/ No Content - operația a reușit, dar serverul nu trimite body.
  // daca am face response.json() -> eroare. de asta returnam undefined as T;
  if (response.status === 204) return undefined as T;

 // daca path.startsWith("/api/auth/") === true; -> inseamna ca suntem la login/register()
 // mergem mai departe 
 // ↓ ↓ ↓
  const data = await response.json();

  if (!response.ok) // response.ok este false pentru orice cod în afara intervalului: 200-299 
    throw {
  message: data?.message || "Eroare la cerer",    //e.g. refreshTokenul este invalid
  status: response.status,

  };
  return data as T;
  // spunem compilatorului că datele primite au tipul ales de apelant
}

async function tryRefresh(): Promise<boolean> {   // fetch() endpoint for  token
  const refreshToken = getRefreshToken();   //if refresh exists -> GET it
  if (!refreshToken) return false;
  //if accessToken not exists -> END block of code.


  //if getRefreshToken() === true -> fetch() for accessToken
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
  saveTokens(data.accessToken, data.refreshToken);    //set tokens in localStorage;
  return true;

  // getRefreshToken() nu ia un refresh token nou. El verifică dacă există unul deja salvat. 
  // Dacă nu există, tryRefresh() abandonează imediat 
  // --> și nu mai face niciun fetch către /api/auth/refresh.

}
