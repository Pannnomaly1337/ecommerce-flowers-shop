'use client';

import { useEffect } from "react";
import { getProducts } from "../services/product.service";

export default function Home() {
  useEffect(() => {
    getProducts().then(console.log);
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Flower Shop</h1>
    </main>
  );
}
