import React from 'react'
import Image from 'next/image'
const AboutSection = () => {
  return (
   <section className="w-full flex justify-between items-center  gap-60 mt-30">
<div className="w-1/2">
<h2 className="uppercase text-3xl font-semibold text-left">
Bringing you the best 
<span className="text-orange-500">audio</span>{" "}
 gear
</h2>
<p className="text-gray-700 text-md mt-5">
  Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.
</p>
</div>
<div className="w-1/2">
<Image src="/home/image-best-gear.jpg" width={450} height={300} alt="best-gear" className=" rounded-lg" />
</div>
</section>
  )
}

export default AboutSection
