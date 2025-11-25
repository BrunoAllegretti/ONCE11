import { createContext } from "react";
import { Product } from "../services/api";

interface AppContextType {
  cartItems: (Product & { quantity: number })[];
  setCartItems: React.Dispatch<React.SetStateAction<(Product & { quantity: number })[]>>;
  addToCart: (item: Product) => void; 
  removeFromCart: (_id: string) => void; 
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isCartVisible: boolean;
  toggleCartVisibility: () => void;

  // 🔥 ADICIONAR AQUI
  user: { name: string; photo: string } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{ name: string; photo: string } | null>
  >;
}

const AppContext = createContext<AppContextType | null>(null);

export default AppContext;
