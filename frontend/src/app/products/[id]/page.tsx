"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/src/types/product";
import { getProductById } from "@/src/services/product.service";
import { addToCart } from "@/src/services/cart.service";
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

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId, 1);
      alert("Added to cart!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <Image
        src={product.imageUrl || "/place-holder.png"}
        width={400}
        height={400}
        alt={product.name}
        className="object-cover"
      />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p>{product.description}</p>
      <p className="text-lg">THB {product.price}</p>
      <button
        onClick={() => handleAddToCart(product.id)}
        className="bg-black text-white px-4 py-2 mt-4"
      >
        Add to Cart
      </button>
    </div>
  );
}
