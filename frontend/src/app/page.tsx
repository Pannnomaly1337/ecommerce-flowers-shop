"use client";

import { useEffect, useState } from "react";
import { getProducts } from "../services/product.service";
import { useRouter } from "next/navigation";
import { Product } from "../types/product";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

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
