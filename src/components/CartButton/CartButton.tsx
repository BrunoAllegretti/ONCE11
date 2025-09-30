import { useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import './CardButton.css';
import AppContext from "../../context/AppContext";

export default function CartButton() {
  const context = useContext(AppContext);
  if (!context) {
    // Se contexto não está disponível, pode retornar null ou outro fallback
    return null;
  }
  const { cartItems } = context;

  return (
    <button type="button" className="cart_button">
      <AiOutlineShoppingCart size={24} />
      {cartItems.length > 0 && (
        <span className="cart-status">{cartItems.length}</span>
      )}
    </button>
  );
}
