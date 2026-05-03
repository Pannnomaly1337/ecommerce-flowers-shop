"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Cart } from "@/src/types/cart";
import {
  getCart,
  removeCartItem,
  updateCartItem,
} from "@/src/services/cart.service";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const router = useRouter();
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
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Cart</h1>
        <div>
          <Link href="/" className="bg-black text-white px-4 py-2">
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
          <div key={item.id} className="border p-4 mb-2 flex justify-between items-center">
            <div>
              <Image
                                src={item.product.imageUrl || "/place-holder.png"}
                                alt={item.product.name}
                                width={50}
                                height={50}
                                className="object-cover"
                              />
              <h2>{item.product.name}</h2>
              <p>Qty: {item.quantity}</p>
              <p>Price: {item.product.price}</p>
            </div>

            <div className="flex gap-x-4">
              <button
                onClick={() => handleUpdate(item.id, item.quantity + 1)}
                disabled={loadingItemId === item.id}
                className="bg-black text-white px-4 py-2 cursor-pointer"
              >
                +
              </button>

              <button
                onClick={() => handleUpdate(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1 || loadingItemId === item.id}
                className="bg-black text-white px-4 py-2 cursor-pointer"
              >
                -
              </button>

              <button
                onClick={() => handleRemove(item.id)}
                className="bg-red-500 text-white px-4 py-2 cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      <div className="full flex justify-between">
        <div className="flex justify-end">
          {!loading && cart && cart.items.length > 0 && (
            <h2 className="mt-6 font-bold">Total: THB {total}</h2>
          )}
        </div>
        <button
          onClick={() => router.push("/checkout")}
          className="bg-black text-white px-4 py-2 mt-4"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
