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

  useEffect(() => {
    console.log("Produtos no contexto foram atualizados:", products);
  }, [products]);

  const value = {
    products,
    setProducts,
    loading,
    setLoading,
    cartItems,
    setCartItems,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
