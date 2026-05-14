// Tipuri pentru API-ul Spring (Online Shop). Oglindesc DTO-urile din
// java/spring-security-jwt/online-shop-cloud-spring-api/src/main/java/.../dto/

// UUID-urile sunt string-uri. Datele ISO (LocalDate / LocalDateTime) sunt string-uri.

// ---------- Auth ----------

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  fullName: string;
  billingAddress: string;
  defaultShippingAddress: string;
  country: string;
  phone: string;
};

export type RefreshRequest = {
  refreshToken: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  email: string;
  permissions: PermissionName[];
};

// ---------- Products ----------

export type ProductsDto = {
  sku: string;
  name: string;
  price: number;
  weight: number;
  descriptions: string;
  category: string;
  createDate: string;
  stock: number;
};

export type ProductsResponse = {
  id: string;
  sku: string;
  name: string;
  price: number;
  weight: number;
  descriptions: string;
  category: string;
  createDate: string;
  stock: number;
};

export type ProductsListResponse = {
  productsList: ProductsResponse[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
};

// ---------- Customer ----------

export type CustomerDto = {
  fullName: string;
  billingAddress: string;
  defaultShippingAddress: string;
  country: string;
  phone: string;
};

export type CustomerResponse = {
  id: string;
  email: string;
  fullName: string;
  billingAddress: string;
  defaultShippingAddress: string;
  country: string;
  phone: string;
  orderSet: OrdersResponse[];
};

export type CustomerListResponse = {
  customers: CustomerResponse[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
};

// ---------- Orders ----------

export type OrdersDto = {
  ammount: number;
  shippingAdress: string;
  orderAddress: string;
  orderEmail: string;
  order_date: string;
  orderStatus: string;
  orderDetailsSet: OrderDetailsDto[];
};

export type OrdersResponse = {
  id: string;
  ammount: number;
  shippingAdress: string;
  orderAddress: string;
  orderEmail: string;
  order_date: string;
  orderStatus: string;
  orderDetailsSet: OrderDetailsResponse[];
};

export type OrdersListResponse = {
  ordersList: OrdersResponse[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
};

// ---------- Order Details ----------

export type OrderDetailsDto = {
  price: number;
  sku: string;
  quantity: number;
  productId: string;
};

export type OrderDetailsResponse = {
  id: string;
  price: number;
  sku: string;
  quantity: number;
  product: ProductsResponse;
};

// ---------- Admin ----------

export type CreateAdminRequest = {
  email: string;
  password: string;
  displayName: string;
  department?: string;
  notes?: string;
};

export type UpdateAdminRequest = {
  displayName: string;
  department?: string;
  notes?: string;
};

export type AdminResponse = {
  id: string;
  email: string;
  displayName: string;
  department: string;
  notes: string;
};

// ---------- Users + Permissions ----------

export type UserResponse = {
  id: string;
  email: string;
  enabled: boolean;
  permissions: PermissionName[];
};

export type AssignPermissionRequest = {
  name: PermissionName;
};

export type CreatePermissionRequest = {
  name: string;
};

export type PermissionResponse = {
  id: string;
  name: string;
};

// ---------- Permissions catalog ----------

export const PERMISSIONS = [
  "USER_READ",
  "USER_WRITE",
  "PRODUCT_READ",
  "PRODUCT_WRITE",
  "ORDER_READ",
  "ORDER_WRITE",
  "ORDER_DETAILS_READ",
  "ORDER_DETAILS_WRITE",
  "PERMISSION_READ",
  "PERMISSION_WRITE",
] as const;

export type PermissionName = (typeof PERMISSIONS)[number];

// ---------- Error response (din GlobalExceptionHandler) ----------

export type ApiError = {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  // 403: yourPermissions + requiredPermission
  yourPermissions?: PermissionName[];
  requiredPermission?: PermissionName;
  // 400 validation:
  errors?: Record<string, string>;
};
