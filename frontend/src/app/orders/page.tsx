"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/src/services/order.service";
import { Order } from "@/src/types/order";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="border p-4 mb-4">
          <p>Status: {order.status}</p>
          <p>Total: {order.total}</p>

          {order.items.map((item) => (
            <div key={item.id}>
              <p>{item.product.name}</p>
              <p>Qty: {item.quantity}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
