import React from 'react'
import Image from 'next/image'
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface CategoryProps{
  imageSrc: string;
  alt: string;
  categoryName?: string;
}
const Category:React.FC<CategoryProps> = ({imageSrc,alt, categoryName=alt}) => {
  return (
    <div className='bg-[#f1f1f1] rounded-md pb-5 pt-0 px-8 md:px-20 flex flex-col justify-between items-center gap-2'>
      <Image src={imageSrc} width={200} height={300} alt={alt} className="-mt-24" />
      <span className='text-lg md:text-lg font-bold uppercase tracking-widest text-center md:text-left'>
        {categoryName}
      </span>
      <button className='flex flex-row justify-center items-center'>
        <span className='text-sm font-medium text-gray-700 uppercase tracking-widest'>Shop</span>
        <ChevronRightIcon className= "size-4 font-medium text-orange-500" />
      </button>
    </div>
  )
}

export default Category
