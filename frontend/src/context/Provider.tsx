import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';
import { Product } from '../services/api';

type ProviderProps = {
  children: React.ReactNode;
};

export default function Provider({ children }: ProviderProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<(Product & { quantity: number })[]>([]);

  const [isCartVisible, setIsCartVisible] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find((item) => item._id === product._id);

      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (_id: string) => {
    setCartItems(prev => prev.filter((item) => item._id !== _id));
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(prev => !prev);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://once11-backend.onrender.com/api/products');
        const data = await response.json();
        setProducts(data.products);
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
