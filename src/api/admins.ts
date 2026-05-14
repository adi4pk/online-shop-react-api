import { apiFetch } from "./client";
import type { AdminResponse, CreateAdminRequest, UpdateAdminRequest } from "@/types/api";

export function listAdmins(): Promise<AdminResponse[]> {
  return apiFetch<AdminResponse[]>("/api/admins");
}

export function getMyAdmin(): Promise<AdminResponse> {
  return apiFetch<AdminResponse>("/api/admins/me");
}

export function updateMyAdmin(body: UpdateAdminRequest): Promise<AdminResponse> {
  return apiFetch<AdminResponse>("/api/admins/me", { method: "PUT", body });
}

export function getAdmin(id: string): Promise<AdminResponse> {
  return apiFetch<AdminResponse>(`/api/admins/${id}`);
}

export function createAdmin(body: CreateAdminRequest): Promise<AdminResponse> {
  return apiFetch<AdminResponse>("/api/admins", { method: "POST", body });
}

export function updateAdmin(id: string, body: UpdateAdminRequest): Promise<AdminResponse> {
  return apiFetch<AdminResponse>(`/api/admins/${id}`, { method: "PUT", body });
}

export function deleteAdmin(id: string): Promise<void> {
  return apiFetch<void>(`/api/admins/${id}`, { method: "DELETE" });
}
