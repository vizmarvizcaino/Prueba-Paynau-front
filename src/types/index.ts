export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_id: number;
  quantity: number;
  price_at_time: number;
  product_name: string;
}

export interface Order {
  id: number;
  user_id: number;
  total: number;
  items: OrderItem[];
  created_at: string;
}

export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string;
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  image_url?: string;
}

export interface CreateOrderDTO {
  items: Array<{
    product_id: number;
    quantity: number;
  }>;
}

export interface User {
  id: number;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}