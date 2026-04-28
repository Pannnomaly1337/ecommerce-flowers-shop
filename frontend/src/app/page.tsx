'use client';

import { useEffect } from "react";
import { getProducts } from "../services/product.service";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token)
    {
      router.push("/login");
    }
    getProducts().then(console.log);
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Home</h1>
    </main>
  );
}
