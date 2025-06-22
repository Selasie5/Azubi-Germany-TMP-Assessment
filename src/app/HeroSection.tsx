import React from 'react'
import Button from './components/ui/core/Button'
const HeroSection = () => {
  return (
   <section
  className="h-[90vh] flex flex-col md:flex-row justify-start items-center bg-cover bg-no-repeat bg-right"
  style={{ backgroundImage: "url('/home/image-hero.jpg')" }}
>
  <div className="flex flex-col justify-center items-start text-white text-left md:w-[40%] px-8 md:pl-10 md:pr-8 py-10 gap-5 bg-black/60 md:bg-transparent md:ml-8 lg:ml-20">
      <span className="text-white uppercase tracking-widest font-light">New Product</span>
      <h1 className="text-6xl uppercase font-medium">XX99 MARK II Headphones</h1>
      <p className="font-light text-md">
        Experience natural lifelike audio and exceptional build quality made for the passionate music enthusiast
      </p>
      <Button bgColor="bg-orange-300" textColor="text-white" label="SEE PRODUCT" href='product/xx99-mark-two-headphones'/>
  </div>
</section>
  )
}

export default HeroSection