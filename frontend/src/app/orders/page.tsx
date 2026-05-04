"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/src/services/order.service";
import { Order } from "@/src/types/order";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-10">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        <div>
          <Link href="/" className="bg-black text-white px-4 py-2">
            Back
          </Link>
        </div>
      </div>

      {loading ? (
        <div>Loading. . .</div>
      ) : (
        orders.map((order) => (
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
        ))
      )}
    </div>
  );
}
