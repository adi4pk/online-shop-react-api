import { apiFetch } from "./client";
import type { CustomerDto, CustomerListResponse, CustomerResponse } from "@/types/api";

export function listCustomers(page = 0, size = 20): Promise<CustomerListResponse> {
  return apiFetch<CustomerListResponse>("/api/customers", { query: { page, size } });
}

export function getMyCustomer(): Promise<CustomerResponse> {
  return apiFetch<CustomerResponse>("/api/customers/me");
}

export function updateMyCustomer(body: CustomerDto): Promise<CustomerResponse> {
  return apiFetch<CustomerResponse>("/api/customers/me", { method: "PUT", body });
}

export function getCustomer(id: string): Promise<CustomerResponse> {
  return apiFetch<CustomerResponse>(`/api/customers/${id}`);
}

export function updateCustomer(id: string, body: CustomerDto): Promise<CustomerResponse> {
  return apiFetch<CustomerResponse>(`/api/customers/${id}`, { method: "PUT", body });
}

export function deleteCustomer(id: string): Promise<void> {
  return apiFetch<void>(`/api/customers/${id}`, { method: "DELETE" });
}
