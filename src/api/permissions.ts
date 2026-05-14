import { apiFetch } from "./client";
import type { CreatePermissionRequest, PermissionResponse } from "@/types/api";

export function listPermissions(): Promise<PermissionResponse[]> {
  return apiFetch<PermissionResponse[]>("/api/permissions");
}

export function createPermission(body: CreatePermissionRequest): Promise<PermissionResponse> {
  return apiFetch<PermissionResponse>("/api/permissions", { method: "POST", body });
}

export function deletePermission(id: string): Promise<void> {
  return apiFetch<void>(`/api/permissions/${id}`, { method: "DELETE" });
}
