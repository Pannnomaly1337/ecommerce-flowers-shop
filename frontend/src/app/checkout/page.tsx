"use client";

import { useEffect, useState } from "react";
import { Cart } from "@/src/types/cart";
import { getCart } from "@/src/services/cart.service";
import { useRouter } from "next/navigation";
import { createOrder } from "@/src/services/order.service";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    getCart().then((data) => {
      setCart(data);
      setLoading(false);
    });
  }, []);

  const handleCheckout = async () => {
    if (confirm) return;
    try {
      setConfirm(true);
      await createOrder();

      alert("Order confirmed");
      router.push("/orders");
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    } finally {
      setConfirm(false);
    }
  };

  const total =
    cart?.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    ) ?? 0;

  return (
    <div className="p-10">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
        <div>
          <Link href="/cart" className="bg-black text-white px-4 py-2">
            Back
          </Link>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : cart && cart.items.length === 0 ? (
        <div className="p-10 border mb-2">
          Cart is empty, Go back to Shopping
        </div>
      ) : (
        cart?.items.map((item) => (
          <div key={item.id} className="border p-4 mb-2">
            <h2>{item.product.name}</h2>
            <p>Qty: {item.quantity}</p>
            <p>Price: {item.product.price}</p>
          </div>
        ))
      )}

      <h2 className="mt-4 font-bold">Total: THB {total}</h2>
      <button
        onClick={handleCheckout}
        className="bg-black text-white px-4 py-2 mt-4 cursor-pointer"
      >
        {confirm ? "Confirming. . ." : "Confirm Order"}
      </button>
    </div>
  );
}
