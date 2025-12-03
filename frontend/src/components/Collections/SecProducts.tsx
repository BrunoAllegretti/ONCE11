import React, { useState, useEffect, useMemo } from 'react';
import Card from '../Card/Card';
import { fetchProducts, Product } from '../../services/api';
import './SecProducts.css';

export default function SecProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);

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

  const visibleProducts = useMemo(() => products.slice(0, Math.min(visibleCount, 40)), [products, visibleCount]);
  const canLoadMore = useMemo(() => Math.min(visibleCount, 40) < Math.min(products.length, 40), [products.length, visibleCount]);
  const canLoadLess = useMemo(() => visibleCount > 8, [visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 8, 40));
  };

  const handleLoadLess = () => {
    setVisibleCount((prev) => Math.max(prev - 8, 8));
  };

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
    <section className="sec-products-container">
      <h2>Produtos</h2>
      <div className="products-grid">
        {visibleProducts.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
      {(canLoadMore || canLoadLess) && (
        <div className="load-more-wrapper">
          {canLoadLess && (
            <button className="load-more-btn secondary" onClick={handleLoadLess}>Ver menos</button>
          )}
          {canLoadMore && (
            <button className="load-more-btn" onClick={handleLoadMore}>Ver mais</button>
          )}
        </div>
      )}
    </section>
  );
}
