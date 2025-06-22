"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const storageKey = session?.user?.email ? `cart_${session.user.email}` : "cart_guest";
  const [cart, setCart] = useState<CartItem[]>([]);

  
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) setCart(JSON.parse(stored));
  }, [storageKey]);

 
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, storageKey]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.slug === item.slug);
      if (existing) {
        return prev.map(i => i.slug === item.slug ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (slug: string) => setCart(prev => prev.filter(i => i.slug !== slug));
  const updateQuantity = (slug: string, quantity: number) => setCart(prev => prev.map(i => i.slug === slug ? { ...i, quantity } : i));
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
