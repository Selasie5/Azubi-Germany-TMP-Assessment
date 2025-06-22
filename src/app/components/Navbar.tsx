import { it } from 'node:test'
import React from 'react'
import Link from 'next/link'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
const Navbar = () => {

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
      <div>
        <ShoppingCartIcon className=' size-6 text-white text-3xl'/>
      </div>
    </nav>
  )
}

export default Navbar
