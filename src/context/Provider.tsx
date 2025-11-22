import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';
import { Product } from '../components/Products';

type ProviderProps = {
  children: React.ReactNode;
};

export default function Provider({ children }: ProviderProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<(Product & { quantity: number })[]>([]);

  // Novo: controle de visibilidade do carrinho
  const [isCartVisible, setIsCartVisible] = useState(false);

  // Adicionar produto ao carrinho
  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remover produto do carrinho
  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Mostrar/esconder carrinho
  const toggleCartVisibility = () => {
    setIsCartVisible((prev) => !prev);
  };

  // Novo: Efeito para buscar produtos da API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Falha ao buscar produtos');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const value = {
    products,
    setProducts,
    loading,
    setLoading,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    isCartVisible,
    toggleCartVisibility,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
