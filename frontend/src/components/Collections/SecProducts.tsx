import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import { fetchProducts, Product } from '../../services/api';
import '../Products.css';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Falha ao carregar os produtos. Verifique a conexão com o backend.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return <div className="loading-message">Carregando produtos...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="no-products-message">Nenhum produto encontrado.</div>;
  }

  return (
    <section className="products-container">
      {products.map((product) => (
        <Card key={product._id} product={product} />
      ))}
    </section>
  );
}
