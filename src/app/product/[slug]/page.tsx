import { getProductsBySlug } from "@/app/lib/product";
import products from "@/app/data.json";
import { notFound } from "next/navigation";
import Image from "next/image";

export async function generateStaticParams() {
  
  return products.map((product: any) => ({ slug: product.slug }));
}

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  const product = getProductsBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="px-20 py-10 flex flex-col justify-center  items-center ">
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
  <span>
    
  </span>
</div>
      </div>
      </div>
      </section>
     
        
      
     
      <p className="mt-2">{product.description}</p>
      <p className="mt-4 font-semibold">${product.price}</p>
    
    </main>
  );
}
