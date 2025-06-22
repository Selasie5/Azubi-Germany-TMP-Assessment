"use client";

import React from 'react'
import Link from 'next/link'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useCart } from "@/app/context/global/cartContex";

const Navbar = () => {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navbarItems = [
    { name: 'Home', href: '/' },
    { name: 'Headphones', href: '/headphones' },
    { name: 'Speakers', href: '/speakers' },
    { name: 'Earphones', href: '/earphones' }
  ]
  return (
    <nav className='bg-[#171717] text-white px-28 py-5 flex justify-between items-center'>
      <div className='text-2xl font-bold poppins'>audiophile</div>  

      <div>
        {navbarItems.map((item)=>
        (
          <Link key={item.name} href = {item.href} className=' uppercase tracking-wider text-sm font-normal mx-4 hover:text-gray-400 transition-colors poppins'>
            {item.name}
          </Link>
        ))}
      </div>
      <Link href="/checkout" className='relative'>
        <ShoppingCartIcon className='size-6 text-white text-3xl' />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
            {cartCount}
          </span>
        )}
      </Link>
    </nav>
  )
}

export default Navbar
