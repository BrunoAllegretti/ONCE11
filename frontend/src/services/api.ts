export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  priceOld?: number;
  price: number;
  filters: string[];
  size?: string;
  color?: string;
  isBestSeller?: boolean;
}

export const fetchProducts = async (search?: string): Promise<Product[]> => {
  const url = search 
    ? `https://once11-backend.onrender.com/api/products?search=${search}`
    : "https://once11-backend.onrender.com/api/products";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  const data = await response.json();
  return data; // <-- AQUI! backend retorna array diretamente
};

