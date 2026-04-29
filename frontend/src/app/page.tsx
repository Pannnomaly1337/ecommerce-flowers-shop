"use client";

import { useEffect, useState } from "react";
import { getProducts } from "../services/product.service";
import { useRouter } from "next/navigation";
import { Product } from "../types/product";

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");

      return;
    }
    getProducts().then(setProducts);
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-4">Products</h1>

      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded">
            <img src={p.imageUrl} className="w-full h-40 object-cover" />
            <h2 className="font-semibold">{p.name}</h2>
            <p>{p.stock} in stock</p>
            <p>THB {p.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
