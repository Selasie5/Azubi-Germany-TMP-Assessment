import { getProductsBySlug } from "@/app/lib/product";
import products from "@/app/data.json";
import { notFound } from "next/navigation";


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
    <main className="p-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="mt-2">{product.description}</p>
      <p className="mt-4 font-semibold">${product.price}</p>
      <img
        src={product.image.desktop.replace('./assets', '/assets')}
        alt={product.name}
        className="mt-6 w-full max-w-md"
      />
    </main>
  );
}