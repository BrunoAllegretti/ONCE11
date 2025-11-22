import { useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./CardButton.css";
import AppContext from "../../context/AppContext";

export default function CartButton() {
  const context = useContext(AppContext);
  if (!context) return null;

  const { cartItems, toggleCartVisibility } = context;
  

  return (
    <button type="button" className="cart_button" onClick={toggleCartVisibility}>
      <AiOutlineShoppingCart size={24} />
      {cartItems.length > 0 && (
        <span className="cart-status">{cartItems.length}</span>
      )}
    </button>
    
  );
}
