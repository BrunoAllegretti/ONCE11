import { createContext } from "react";
import { Product } from "../components/Products";

interface AppContextType {
  cartItems: (Product & { quantity: number })[];
  setCartItems: React.Dispatch<React.SetStateAction<(Product & { quantity: number })[]>>;
  addToCart: (item: Product & { quantity: number }) => void;
  removeFromCart: (id: number) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export default AppContext;
