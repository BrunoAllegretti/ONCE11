import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import "./Card.css";
import { Product } from "../Products";
import AppContext from "../../context/AppContext";
import { BsCartPlusFill } from "react-icons/bs";

export type CardProps = Product;

export default function Card({ id, name, image, description, price }: CardProps) {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  if (!context) return null;

  const { cartItems, setCartItems } = context;

  const handleAddCart = () => {
    const existingItem = cartItems.find((item) => item.id === id);

    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      const newItem = {
        id,
        name,
        image,
        description,
        price,
        quantity: 1,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  return (
    <div
      className="card"
      key={id}
    >
      <img draggable={false} src={image} alt={name} className="card-img" />
      <h2 className="card-title">{name}</h2>
      <p className="card-description">{description}</p>
      <div className="card-price">
        <span className="new-price">R$ {price.toFixed(2)}</span>
      </div>

      <div className="card-actions">
        <button
          type="button"
          className="buy-button"
          onClick={() => navigate('/buy')}
        >
          Comprar Agora
        </button>
        <button
          type="button"
          className="add-to-cart-button"
          onClick={handleAddCart}
        >
          <BsCartPlusFill size={20} />
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
