import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../services/api";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(product: Product) {
    setItems((oldItems) => {
      // se já existe, incrementa quantidade
      const found = oldItems.find(i => i.product._id === product._id);
      if (found) {
        return oldItems.map(i =>
          i.product._id === product._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...oldItems, { product, quantity: 1 }];
    });
  }

  function removeItem(id: string) {
    setItems((oldItems) => oldItems.filter(i => i.product._id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}