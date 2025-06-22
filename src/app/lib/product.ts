import data from "../data.json"

export const getAllProducts=()=>
{
  return data;
}

export const getProductsBySlug = (slug:string)=>
{
  return data.find(product => product.slug === slug)
}

export function getAllProductsByCategory(category:string) {
  return data.filter(product => product.category === category);
}

export function getAllProductsSlugs(): { params: { slug: string } }[] {
  return data.map(product => ({
    params: {
      slug: product.slug
    }
  }));
}