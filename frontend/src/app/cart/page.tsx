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
  const [loading, setLoading] = useState(true);
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);

  useEffect(() => {
    getCart().then((data) => {
      setCart(data);
      setLoading(false);
    });
  }, []);

  const refreshCart = async () => {
    const data = await getCart();
    setCart(data);
  };

  const handleUpdate = async (itemId: string, quantity: number) => {
    if (quantity <= 0) return;

    setLoadingItemId(itemId);
    await updateCartItem(itemId, quantity);
    await refreshCart();
    setLoadingItemId(null);
  };

  const handleRemove = async (itemId: string) => {
    const isConfirmed = confirm("Are you sure you want to remove this item?");

    if (!isConfirmed) return;
    
    await removeCartItem(itemId);
    await refreshCart();
  };

  const total =
    cart?.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    ) ?? 0;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>

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

            <div className="flex gap-4">
              <button
                onClick={() => handleUpdate(item.id, item.quantity + 1)}
                disabled={loadingItemId === item.id}
                className="bg-black text-white px-4 py-2 mt-4"
              >
                +
              </button>

              <button
                onClick={() => handleUpdate(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1 || loadingItemId === item.id}
                className="bg-black text-white px-4 py-2 mt-4"
              >
                -
              </button>

              <button
                onClick={() => handleRemove(item.id)}
                className="bg-black text-white px-4 py-2 mt-4"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      {!loading && cart && cart.items.length > 0 && (
        <h2 className="mt-6 font-bold">Total: THB {total}</h2>
      )}
    </div>
  );
}
