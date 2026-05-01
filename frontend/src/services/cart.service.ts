import { api } from "../lib/api";

export const addToCart = async (productId: string, quantity: number) => {
  const res = await api.post("/cart", {
    productId,
    quantity,
  });

  return res.data;
};

export const getCart = async () => {
  const res = await api.get("/cart");

  return res.data;
};

export const updateCartItem = async (itemId: string, quantity: number) => {
  const res = await api.patch(`/cart/${itemId}`, { quantity });

  return res.data;
};

export const removeCartItem = async (itemId: string) => {
  const res = await api.delete(`/cart/${itemId}`);

  return res.data;
};
