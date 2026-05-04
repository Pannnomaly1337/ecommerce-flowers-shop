"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/src/types/product";
import { getProductById } from "@/src/services/product.service";
import { addToCart } from "@/src/services/cart.service";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetail() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const isOutOfStock = product?.stock === 0;

  useEffect(() => {
    if (!id) return;

    getProductById(id).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  const handleAddToCart = async (productId: string) => {
    if (adding) return;
    try {
      setAdding(true);

      await addToCart(productId, 1);
      alert("Added to cart!");
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <main className="p-10">
      <div className="mb-4 flex justify-between items-center">
        <Link href="/" className="bg-black text-white px-4 py-2">
          Back
        </Link>
        <Link href="/cart" className="bg-black text-white px-4 py-2">
          My Cart
        </Link>
      </div>
      {loading ? (
        <div>Loading. . .</div>
      ) : !product ? (
        "Product not found"
      ) : (
        <div className="pt-8">
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
            disabled={isOutOfStock || adding}
            className={`px-4 py-2 mt-4  ${isOutOfStock ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white cursor-pointer"}`}
          >
            {adding
              ? "Adding. . ."
              : isOutOfStock
                ? "Out of Stock"
                : "Add to Cart"}
          </button>
        </div>
      )}
    </main>
  );
}
