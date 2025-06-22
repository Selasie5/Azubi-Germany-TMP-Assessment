"use client";
import React from "react";
import Button from "./Button";

export default function QuantityCounter({ onAdd }: { onAdd?: (qty: number) => void }) {
  const [qty, setQty] = React.useState(1);

  const increment = () => setQty(q => q + 1);
  const decrement = () => setQty(q => (q > 1 ? q - 1 : 1));

  return (
    <div className="flex items-center gap-4 ">
      <div  className="bg-gray-200 space-x-8 py-3 px-4">
 <button
        className=" bg-gray-200  text-sm text-gray-600 font-bold"
        onClick={decrement}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="w-8 text-center text-sm font-semibold">{qty}</span>
      <button
        className="p bg-gray-200   text-sm text-gray-600 font-bold"
        onClick={increment}
        aria-label="Increase quantity"
      >
        +
      </button>
      </div>
     
      <Button
        label="Add to Cart" bgColor="bg-orange-300 uppercase" textColor="text-white"
        onClick={() => onAdd?.(qty)}
      />
       
      
    </div>
  );
}
