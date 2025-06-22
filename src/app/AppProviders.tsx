"use client";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/app/context/global/cartContex";
import Navbar from "./components/Navbar";
import React from "react";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        <Navbar />
        {children}
      </CartProvider>
    </SessionProvider>
  );
}
