"use client";
import React from "react";
import QuantityCounter from "@/app/components/ui/core/QuantityCounter";
import { useCart } from "@/app/context/global/cartContex";

// @ts-ignore
export default function ProductDetailsClient({ product }: { 
  // @ts-ignore
  product: any
 }) {
  const { addToCart } = useCart();
  return (
    <QuantityCounter
      onAdd={(qty) =>
        addToCart({
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image.desktop.replace('./assets', '/assets'),
          quantity: qty,
        })
      }
    />
  );
}
