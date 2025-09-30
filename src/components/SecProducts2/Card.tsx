import { useContext } from "react";
import "./Card.css";
import { Link } from 'react-router-dom';
import { Product } from "../Products";
import AppContext from "../../context/AppContext";
import { BsCartPlusFill } from "react-icons/bs";

type CardProps = Product;

export default function Card({ id, name, image, description, priceOld, price }: CardProps) {
  const context = useContext(AppContext);
  if (!context) return null;

  const { cartItems, setCartItems } = context;

  const handleAddCart = () => {
    const existingItem = cartItems.find((item) => item.id === id);

    if (existingItem) {
      // Se já existe, incrementa a quantidade
      const updatedCartItems = cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      // Se não existe, adiciona com quantity: 1
      const newItem = {
        id,
        name,
        image,
        description,
        priceOld,
        price,
        quantity: 1,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  return (
    <div className="card" key={id}>
      <img draggable={false} src={image} alt={name} className="card-img" />
      <h2 className="card-title">{name}</h2>
      <p className="card-description">{description}</p>
      <div className="card-price">
        <span className="old-price">R$ {priceOld.toFixed(2)}</span>
        <span className="new-price">R$ {price.toFixed(2)}</span>
      </div>
      <button type="button" className="card-button" onClick={handleAddCart}>
        <BsCartPlusFill />
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
