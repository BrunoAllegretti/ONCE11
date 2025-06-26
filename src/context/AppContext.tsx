import { createContext } from "react";
import { Product } from "../components/Products"; 

interface AppContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: (Product & { quantity: number })[];
  setCartItems: React.Dispatch<React.SetStateAction<(Product & { quantity: number })[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export default AppContext;
