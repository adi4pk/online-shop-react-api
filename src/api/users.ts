import { apiFetch } from "./client";
import type { AssignPermissionRequest, PermissionResponse, UserResponse } from "@/types/api";

export function listUsers(): Promise<UserResponse[]> {
  return apiFetch<UserResponse[]>("/api/users");
}

export function getUser(userId: string): Promise<UserResponse> {
  return apiFetch<UserResponse>(`/api/users/${userId}`);
}

export function listUserPermissions(userId: string): Promise<PermissionResponse[]> {
  return apiFetch<PermissionResponse[]>(`/api/users/${userId}/permissions`);
}

export function assignPermissionToUser(
  userId: string,
  body: AssignPermissionRequest
): Promise<UserResponse> {
  return apiFetch<UserResponse>(`/api/users/${userId}/permissions`, { method: "POST", body });
}

export function revokePermissionFromUser(
  userId: string,
  permissionName: string
): Promise<UserResponse> {
  return apiFetch<UserResponse>(
    `/api/users/${userId}/permissions/${permissionName}`,
    { method: "DELETE" }
  );
}
