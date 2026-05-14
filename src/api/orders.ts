import { apiFetch } from "./client";
import type { OrdersDto, OrdersListResponse, OrdersResponse } from "@/types/api";

export function listAllOrders(page = 0, size = 20): Promise<OrdersListResponse> {
  return apiFetch<OrdersListResponse>("/api/orders", { query: { page, size } });
}

export function listMyOrders(page = 0, size = 20): Promise<OrdersListResponse> {
  return apiFetch<OrdersListResponse>("/api/orders/me", { query: { page, size } });
}

export function getOrder(id: string): Promise<OrdersResponse> {
  return apiFetch<OrdersResponse>(`/api/orders/${id}`);
}

export function createMyOrder(body: OrdersDto): Promise<OrdersResponse> {
  return apiFetch<OrdersResponse>("/api/orders/me", { method: "POST", body });
}

export function updateOrderStatus(id: string, status: string): Promise<OrdersResponse> {
  return apiFetch<OrdersResponse>(`/api/orders/${id}/status`, {
    method: "PATCH",
    body: { orderStatus: status },
  });
}

export function deleteOrder(id: string): Promise<void> {
  return apiFetch<void>(`/api/orders/${id}`, { method: "DELETE" });
}
