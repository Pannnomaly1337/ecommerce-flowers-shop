"use client";

import { useEffect, useState } from "react";
import { Cart } from "@/src/types/cart";
import { getCart } from "@/src/services/cart.service";
import { useRouter } from "next/navigation";
import { createOrder } from "@/src/services/order.service";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);

  const handleCheckout = async () => {
    try {
      await createOrder();

      router.push("/orders");
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    }
  };

  useEffect(() => {
    getCart().then(setCart);
  }, []);

  if (!cart) return <div>Loading. . .</div>;

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Order Summary</h1>

      {cart.items.map((item) => (
        <div key={item.id} className="border p-4 mb-2">
          <h2>{item.product.name}</h2>
          <p>Qty: {item.quantity}</p>
          <p>Price: {item.product.price}</p>
        </div>
      ))}

      <h2 className="mt-4 font-bold">Total: THB {total}</h2>
      <button onClick={handleCheckout} className="bg-black text-white px-4 py-2 mt-4">Confirm Order</button>
    </div>
  );
}
