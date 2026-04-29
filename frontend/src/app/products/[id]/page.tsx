"use client";

import { getProductById } from "@/src/services/product.service";
import { Product } from "@/src/types/product";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductDetail() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;

    getProductById(id).then(setProduct);
  }, [id]);

  if (!product) {
    return <div>Loading. . .</div>;
  }

  return (
    <div className="p-6">
      <Image src={product.imageUrl || "/place-holder.png"} width={400} height={400} alt={product.name} className="object-cover" />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p>{product.description}</p>
      <p className="text-lg">THB {product.price}</p>
    </div>
  );
}
