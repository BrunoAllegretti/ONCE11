import { useContext } from 'react';
import "./Products.css";
import Loading from '../Loading/Loading';
import AppContext from '../../context/AppContext';
import ProductCard from './ProductCard';
import { Product } from '../Products'; // se usar o tipo Product

export default function ProductsSearch() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("AppContext must be used within a Provider");
  }

  // Agora o TypeScript sabe que context não é undefined
  const { products, loading } = context;

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="products-container">
      {products.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        products.map((product: Product) => (
          <ProductCard key={product.id} data={product} />
        ))
      )}
    </section>
  );
}
