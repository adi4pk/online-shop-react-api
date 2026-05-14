import { apiFetch } from "./client";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types/api";

export function login(body: LoginRequest): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/api/auth/login", { method: "POST", body });
}

export function register(body: RegisterRequest): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/api/auth/register", { method: "POST", body });
}
