import { Product } from "./product";

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
}
