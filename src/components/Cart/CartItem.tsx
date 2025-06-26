import { useContext } from 'react';
import { BsCartDashFill } from 'react-icons/bs';
import './CartItem.css';
import AppContext from '../../context/AppContext';
import { Product } from '../Products';

type CartItemProps = {
  data: Product & { quantity: number };
};

export default function CartItem({ data }: CartItemProps) {
  const context = useContext(AppContext);
  if (!context) return null;

  const { cartItems, setCartItems } = context;
  const { id, image, name, price, quantity } = data;

  const handleRemoveItem = () => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCartItems(updatedItems);
  };

  return (
    <section className="cart-item">
      <img
        src={`${image}`}
        alt={`Imagem de ${name}`}
        className="cart-item-image"
      />

      <div className="cart-item-content">
        <h3 className="cart-item-title">{quantity}x {name}</h3>
        <h3 className="cart-item-price">{`R$ ${(price * quantity).toFixed(2)}`}</h3>
      </div>

      <button
          type="button"
          className="button__remove-item"
          onClick={handleRemoveItem}
        >
          <BsCartDashFill />
        </button>

    </section>
  );
}