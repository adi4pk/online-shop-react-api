import { apiFetch } from "./client";
import type { ProductsDto, ProductsListResponse, ProductsResponse } from "@/types/api";

export function listProducts(page = 0, size = 20): Promise<ProductsListResponse> {
  return apiFetch<ProductsListResponse>("/api/products", { query: { page, size } });
}

export function getProduct(id: string): Promise<ProductsResponse> {
  return apiFetch<ProductsResponse>(`/api/products/${id}`);
}

export function createProduct(body: ProductsDto): Promise<ProductsResponse> {
  return apiFetch<ProductsResponse>("/api/products", { method: "POST", body });
}

export function updateProduct(id: string, body: ProductsDto): Promise<ProductsResponse> {
  return apiFetch<ProductsResponse>(`/api/products/${id}`, { method: "PUT", body });
}

export function deleteProduct(id: string): Promise<void> {
  return apiFetch<void>(`/api/products/${id}`, { method: "DELETE" });
}
