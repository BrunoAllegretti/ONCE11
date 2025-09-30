import { Product } from '../components/Products';

const fetchProducts = async (query = ''): Promise<Product[]> => {
  console.log('fetchProducts chamada com query:', query);
  const response = await fetch(`http://localhost:3001/api/products/search?q=${encodeURIComponent(query)}`);
  console.log('Resposta fetch:', response);
  if (!response.ok) {
    throw new Error('Erro ao buscar produtos');
  }
  const data: Product[] = await response.json();
  console.log('Dados recebidos:', data);
  return data;
};

export default fetchProducts;
