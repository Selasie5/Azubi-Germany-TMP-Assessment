import { getProductsBySlug } from "@/app/lib/product";
import products from "@/app/data.json";
import { notFound } from "next/navigation";
import Image from "next/image";
import ProductDetailsClient from "@/app/components/ui/core/ProductDetailsClient";
import Button from "@/app/components/ui/core/Button";
import CategoriesSection from "@/app/components/CategoriesSection";
import AboutSection from "@/app/components/AboutSection";

export async function generateStaticParams() {
  
  return products.map((product: any) => ({ slug: product.slug }));
}

type Props = {
  params: {
    slug: string;
  };
};

type Include = {
  quantity:number;
  item:string;
}
export default async function Page({ params }: Props) {
  const product = getProductsBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="px-20 py-10 flex flex-col justify-center  items-center gap-40 ">
      <section>
 <div className="w-full flex justify-start items-start ">
<button className="text-gray-500 ">
          Go Back
        </button>
      </div>

      <div className="flex justify-center items-center gap-30">
        <div className="w-1/2">
 <Image
        src={product.image.desktop.replace('./assets', '/assets')}
        alt={product.name}
        width={500}
        height={500}
        className="mt-6 w-full max-w-md"
      />
        </div>
 
      <div className="w-1/2 flex flex-col justify-center items-start gap-5">
{product.name == "XX99 Mark II" ? (
  <span className="text-sm uppercase text-orange-500">NEW PRODUCT</span>
) : null}
          <h1 className="text-3xl font-bold uppercase">{product.name}</h1>
          <p className="text-gray-500 ">{product.description}</p>
<span className="text-lg text-black font-semibold tracking-widest">
  {new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(product.price)}
</span>

<div className="flex gap-4 mt-4">
  <ProductDetailsClient product={product} />
</div>
      </div>
      </div>
      </section>
     
        <section className="flex justify-between items-center gap-20">
          <div className=" w-1/2 flex flex-col justify-start items-start gap-5">
              <h2 className="uppercase text-2xl tracking-wide font-bold">Features</h2>
              <p className="text-gray-600">
  {product.features.split(/\n+/).map((para: string, idx: number) => (
    <span key={idx} className="block mb-4">{para}</span>
  ))}
</p>
          </div>
          <div className="w-1/2 flex flex-col justify-center  items-start gap-5">
                  <h2 className="uppercase text-2xl tracking-wide font-bold">In The Box</h2>
    {
      product.includes.map((include: Include) => (
        <div key={include.item} className="flex justify-start items-center w-full mt-2 gap-4">
           <span className=" text-orange-500">{include.quantity}x</span>
          <span className="text-gray-500">{include.item}</span>
         
        </div>
      ))
    }
          </div>
        </section>

       <section className=" w-full flex flex-col justify-center items-center gap-10">
                      <h2 className="uppercase text-2xl tracking-wide font-bold">You May Also Like</h2>
        {product.others && product.others.length > 0 ? (
          <div className="fw-full flex flex-wrap justify-center items-center gap-30">
            {product.others.map((other: any) => (
              <div key={other.slug} className="w-1/4 p-4= rounded-lg flex flex-col justify-center items-center gap-5">
                <Image
                  src={other.image.desktop.replace('./assets', '/assets')}
                  alt={other.name}
                  width={200}
                  height={200}
                  className="w-full h-auto mb-4 bg-gray-100 rounded-lg p-4"
                />
                <h3 className="text-lg font-semibold">{other.name}</h3> 
                {/* <span className="text-sm text-gray-500">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(other.price)}
                </span> */}
               <Button bgColor="bg-orange-300" textColor="text-white" label="SEE PRODUCT" href={`${other.slug}`}/>
              </div>
            ))}
          </div>
        ) : null}
       </section>
      <CategoriesSection/>
      <AboutSection/>
     
      {/* <p className="mt-2">{product.description}</p>
      <p className="mt-4 font-semibold">${product.price}</p> */}
    
    </main>
  );
}
