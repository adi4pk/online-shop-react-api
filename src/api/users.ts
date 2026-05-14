import { apiFetch } from "./client";
import type { AssignPermissionRequest, PermissionResponse, UserResponse } from "@/types/api";

export function listUsers() {
  return apiFetch<UserResponse[]>("/api/users");
}

export function getUser(userId: string) {
  return apiFetch<UserResponse>(`/api/users/${userId}`);
}

export function listUserPermissions(userId: string) {
  return apiFetch<PermissionResponse[]>(`/api/users/${userId}/permissions`);
}

export function assignPermissionToUser(userId: string, body: AssignPermissionRequest) {
  return apiFetch<UserResponse>(`/api/users/${userId}/permissions`, { method: "POST", body });
}

export function revokePermissionFromUser(userId: string, permissionName: string) {
  return apiFetch<UserResponse>(
    `/api/users/${userId}/permissions/${permissionName}`,
    { method: "DELETE" }
  );
}
