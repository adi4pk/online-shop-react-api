import { apiFetch } from "./client";
import type { AdminResponse, CreateAdminRequest, UpdateAdminRequest } from "@/types/api";

export function listAdmins() {
  return apiFetch<AdminResponse[]>("/api/admins");
}

export function getMyAdmin() {
  return apiFetch<AdminResponse>("/api/admins/me");
}

export function updateMyAdmin(body: UpdateAdminRequest) {
  return apiFetch<AdminResponse>("/api/admins/me", { method: "PUT", body });
}

export function getAdmin(id: string) {
  return apiFetch<AdminResponse>(`/api/admins/${id}`);
}

export function createAdmin(body: CreateAdminRequest) {
  return apiFetch<AdminResponse>("/api/admins", { method: "POST", body });
}

export function updateAdmin(id: string, body: UpdateAdminRequest) {
  return apiFetch<AdminResponse>(`/api/admins/${id}`, { method: "PUT", body });
}

export function deleteAdmin(id: string) {
  return apiFetch<void>(`/api/admins/${id}`, { method: "DELETE" });
}
