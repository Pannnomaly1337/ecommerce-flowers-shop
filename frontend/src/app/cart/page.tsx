"use client";

import { useEffect, useState } from "react";
import { Cart } from "@/src/types/cart";
import {
  getCart,
  removeCartItem,
  updateCartItem,
} from "@/src/services/cart.service";

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    getCart().then(setCart);
  }, []);

  const refreshCart = async () => {
    const data = await getCart();
    setCart(data);
  };

  const handleUpdate = async (itemId: string, quantity: number) => {
    await updateCartItem(itemId, quantity);
    refreshCart();
  };

  const handleRemove = async (itemId: string) => {
    await removeCartItem(itemId);
    refreshCart();
  };

  if (!cart) return <div>Loading. . .</div>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>

      {cart.items.map((item) => (
        <div key={item.id} className="border p-4 mb-2">
          <h2>{item.product.name}</h2>
          <p>Qty: {item.quantity}</p>
          <p>Price: {item.product.price}</p>
          <div className="flex gap-4">
            <button
              onClick={() => handleUpdate(item.id, item.quantity + 1)}
              className="bg-black text-white px-4 py-2 mt-4 cursor-pointer"
            >
              +
            </button>
            <button
              onClick={() => handleRemove(item.id)}
              className="bg-black text-white px-4 py-2 mt-4 cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
