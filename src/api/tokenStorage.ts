// Pastreaza tokenii JWT in localStorage.

const ACCESS_KEY = "online-shop.access-token";
const REFRESH_KEY = "online-shop.refresh-token";

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_KEY);
}

export function saveTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem(ACCESS_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
}

export function clearTokens(): void {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}


export interface JwtPayload {
  type: string;
  authorities: string[];
  sub: string;
  iat: number;
  exp: number;
}


export function decodeJwt(token: string): JwtPayload {
  const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(payload));
}
