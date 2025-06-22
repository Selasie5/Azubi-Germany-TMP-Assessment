import React from 'react'
import Category from './ui/core/CategoryCard'
import { categories } from '../data'

const CategoriesSection = () => {
  return (
    <section className="grid grid-cols-3 place-items-center gap-10 py-20">
    
    {
      categories.map((category)=>
      (
        <Category key={category.imageSrc} imageSrc={category.imageSrc} alt={category.alt} />
      ))
    }
    </section>
  )
}

export default CategoriesSection