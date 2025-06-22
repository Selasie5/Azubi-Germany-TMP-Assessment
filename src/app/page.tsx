import Button from "@/app/components/ui/core/Button";
import Image from "next/image";
import HeroSection from "@/app/components/HeroSection";
import CategoriesSection from "@/app/components/CategoriesSection";
import AboutSection from "./components/AboutSection";
export default function Home() {

    return (
    <main className=""> 
    {/* Hero Section  */}
      
<HeroSection/>

{/* Content Section */}

<section className="mx-20 md:mx-20 my-20 flex flex-col justify-center items-center gap-30">
<CategoriesSection/>

<section className=" w-full  rounded-lg bg-orange-300">
<div className=' px-10 pt-10 bg-url[("/home/pattern-circle.svg")] bg-cover bg-no-repeat bg-center h-[50vh] flex  justify-center items-start text-white text-left gap-5'>
<Image src="/home/image-earphones-yx1.jpg" width={200} height={200} alt="earphones" className="w-1/2 md:w-1/3" />
</div>
</section>
<section className="w-full bg-gray-200 rounded-lg h-[50vh]">
  <div className="flex flex-row w-full h-full">
    <div className="w-1/2 flex flex-col justify-center items-start px-20 gap-10">
      <h3 className="uppercase text-2xl font-medium">ZX7 Speaker</h3>
      <Button textColor="text-black" bgColor="bg-transparent border-2 font-medium border-black " label="SEE PRODUCT" href="/product/zx7-speaker"/>
    </div>
    <div className="w-1/2 h-full">
      <Image src="/home/image-speaker-zx7.jpg" width={500} height={500} alt="speaker-zx7" className="w-full h-full object-cover" />
    </div>
  </div>
</section>

<section className="flex items-center h-[50vh] w-full gap-20">
  <div className="w-1/2 h-full rounded-lg">
    <Image src="/home/image-earphones-yx1.jpg" width={900} height={900} alt="yx1" className="w-full h-full object-cover" />
  </div>
  <div className="w-1/2 h-full flex flex-col justify-center items-start gap-10 bg-gray-200 px-20 rounded-lg">
    <h3 className="uppercase text-2xl font-medium">YX1 Earphones</h3>
    <Button textColor="text-black" bgColor="bg-transparent border-2 font-medium border-black " label="SEE PRODUCT"/>
  </div>
</section>


<AboutSection/>

</section>


    </main>
  );
}
