export interface RegisterRequest{    
  email: string,
  password: string;
  fullName: string;
  billingAddress: string;
  defaultShippingAddress: string;
  country: string;
  phone: string;
}