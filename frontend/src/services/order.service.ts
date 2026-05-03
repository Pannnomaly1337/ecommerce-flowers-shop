import { api } from "../lib/api";
import { Order } from "../types/order";

export const createOrder = async () => {
  const res = await api.post("/orders");

  return res.data;
};

export const getOrders = async (): Promise<Order[]> => {
  const res = await api.get("/orders/my");

  return res.data;
};
