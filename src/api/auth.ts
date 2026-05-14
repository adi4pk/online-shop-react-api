import { apiFetch } from "./client";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types/api";

export function login(body: LoginRequest) {
  return apiFetch<AuthResponse>("/api/auth/login", { method: "POST", body });
}

export function register(body: RegisterRequest) {
  return apiFetch<AuthResponse>("/api/auth/register", { method: "POST", body });
}
