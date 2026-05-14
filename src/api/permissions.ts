import { apiFetch } from "./client";
import type { CreatePermissionRequest, PermissionResponse } from "@/types/api";

export function listPermissions() {
  return apiFetch<PermissionResponse[]>("/api/permissions");
}

export function createPermission(body: CreatePermissionRequest) {
  return apiFetch<PermissionResponse>("/api/permissions", { method: "POST", body });
}

export function deletePermission(id: string) {
  return apiFetch<void>(`/api/permissions/${id}`, { method: "DELETE" });
}
