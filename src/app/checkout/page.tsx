"use client";
import React, { useState } from "react";
import { useCart } from "@/app/context/global/cartContex";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

// Extend the Window interface to include PaystackPop
declare global {
  interface Window {
    PaystackPop?: any;
  }
}

// Add your Paystack public key here
const PAYSTACK_PUBLIC_KEY = "pk_test_a9c8320ce8cda1b9b5439912f54c19df790be487";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [paying, setPaying] = useState(false);
  // const router = useRouter();

  const productTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 50;
  const vat = Math.round(productTotal * 0.2);
  const grandTotal = productTotal + shipping + vat;

  // Paystack payment handler
  const handlePaystack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return alert("Email is required for payment");
    setPaying(true);
    const handler = window.PaystackPop && window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email,
      amount: grandTotal * 100, // Paystack expects amount in kobo/pesewas
      currency: "GHS",
      callback: function() {
        setShowModal(true);
        clearCart();
        setPaying(false);
      },
      onClose: function() {
        setPaying(false);
      }
    });
    if (handler) handler.openIframe();
  };

  // Load Paystack script
  React.useEffect(() => {
    if (!window.PaystackPop) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // If not authenticated, show sign-in prompt
  if (status === "loading") {
    return <main className="max-w-4xl mx-auto p-8"><p>Loading...</p></main>;
  }
  if (!session) {
    return (
      <main className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Sign In Required</h1>
        <p className="mb-6">You must be signed in to proceed to checkout.</p>
        <button
          className="bg-orange-500 text-white px-6 py-2 rounded font-bold"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-2/3">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="divide-y">
              {cart.map(item => (
                <li key={item.slug} className="flex items-center gap-4 py-4">
                  <Image src={item.image} alt={item.name} width={60} height={60} className="rounded" />
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-gray-500">₵{item.price} x {item.quantity}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.slug, item.quantity - 1)} disabled={item.quantity <= 1} className="px-2 py-1 bg-gray-200 rounded">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.slug, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.slug)} className="ml-4 text-red-500">Remove</button>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 text-right font-bold text-lg">Product Total: ₵{productTotal.toLocaleString()}</div>
          <div className="text-right text-md">Shipping: ₵{shipping}</div>
          <div className="text-right text-md">VAT (20%): ₵{vat.toLocaleString()}</div>
          <div className="mt-2 text-right font-bold text-xl">Grand Total: ₵{grandTotal.toLocaleString()}</div>
        </div>
        <form className="w-full md:w-1/3 bg-gray-100 p-6 rounded" onSubmit={handlePaystack}>
          <h2 className="text-xl font-semibold mb-4">Shipping Info</h2>
          <input value={name} onChange={e => setName(e.target.value)} required placeholder="Name" className="w-full mb-3 p-2 rounded border" />
          <input value={email} onChange={e => setEmail(e.target.value)} required type="email" placeholder="Email" className="w-full mb-3 p-2 rounded border" />
          <input value={address} onChange={e => setAddress(e.target.value)} required placeholder="Address" className="w-full mb-3 p-2 rounded border" />
          <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded font-bold mt-4" disabled={paying}>
            {paying ? "Processing..." : "Pay with Paystack"}
          </button>
        </form>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Thank you for your order!</h2>
            <p className="mb-4">Here is your order summary:</p>
            <ul className="mb-4 text-left">
              {cart.map(item => (
                <li key={item.slug} className="flex justify-between mb-2">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₵{(item.price * item.quantity).toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <div className="mb-2">Product Total: ₵{productTotal.toLocaleString()}</div>
            <div className="mb-2">Shipping: ₵{shipping}</div>
            <div className="mb-2">VAT (20%): ₵{vat.toLocaleString()}</div>
            <div className="font-bold text-lg mb-4">Grand Total: ₵{grandTotal.toLocaleString()}</div>
            <button className="bg-orange-500 text-white px-6 py-2 rounded font-bold" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </main>
  );
}
