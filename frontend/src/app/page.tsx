"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "../types/product";
import { getProducts } from "../services/product.service";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("token");
    }
    return false;
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    getProducts().then(setProducts);
  }, [isLoggedIn, router]);

  return (
    <main className="p-10">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <div className="flex gap-x-4">
          <Link href="/cart" className="bg-black text-white px-4 py-2">
            My Cart
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="bg-black text-white px-4 py-2">
              Login
            </Link>
          )}
        </div>
      </div>

      <input
        type="text"
        placeholder="Search our products. . ."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <div className="grid grid-cols-3 gap-4">
        {products
          .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
          .map((p) => (
            <Link key={p.id} href={`/products/${p.id}`}>
              <div className="border p-4 rounded cursor-pointer">
                <Image
                  src={p.imageUrl || "/place-holder.png"}
                  alt={p.name}
                  width={400}
                  height={400}
                  className="object-cover"
                />
                <h2 className="font-semibold">{p.name}</h2>
                <p>{p.stock} item(s) in stock</p>
                <p>THB {p.price}</p>
              </div>
            </Link>
          ))}
      </div>
    </main>
  );
}
