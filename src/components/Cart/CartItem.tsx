import { useContext, useState } from 'react';
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
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveItem = () => {
    setIsRemoving(true);
    
    // Aguarda a animação antes de remover o item
    setTimeout(() => {
      const updatedItems = cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter(item => item.quantity > 0);

      setCartItems(updatedItems);
    }, 300);
  };

  return (
    <section className={`cart-item ${isRemoving ? 'removing' : ''}`}>
      <img
        src={`${image}`}
        alt={`Imagem de ${name}`}
        className="cart-item-image"
      />

      <div className="cart-item-content">
        <h3 className="cart-item-title">
          {quantity}x {name}
        </h3>

        <div className="cart-item-right">
          <h3 className="cart-item-price">
            {`R$ ${(price * quantity).toFixed(2)}`}
          </h3>
          <button
            type="button"
            className="button__remove-item"
            onClick={handleRemoveItem}
            disabled={isRemoving}
            title="Remover item do carrinho"
          >
            <BsCartDashFill />
          </button>
        </div>
      </div>
    </section>
  );
}
