import { Product } from "./product";

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface Order {
  id: string;
  status: string;
  total: number;
  items: OrderItem[];
}
