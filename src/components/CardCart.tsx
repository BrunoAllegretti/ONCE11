import { useContext } from "react";
import "./CardCart.css";
import AppContext from "./../context/AppContext";

type CardProps = {
  id: number;
  name: string;
  image: string;
  description: string;
  priceOld: number;
  price: number;
};

export default function Card({ id, name, image, description, priceOld, price }: CardProps) {
  const context = useContext(AppContext);

  if (!context) return null;

  const { addToCart } = context;

  const handleAddToCart = () => {
    if (!addToCart) {
      console.warn("Função addToCart não encontrada no contexto!");
      return;
    }

    const product = {
      id,
      name,
      image,
      description,
      priceOld,
      price,
      quantity: 1,
    };

    console.log("Adicionando ao carrinho:", product);
    addToCart(product);
  };

  return (
    <div className="card" key={id}>
      <div className="card-image-container">
        <img draggable={false} src={image} alt={name} className="card-img" />
      </div>

      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        <p className="card-description">{description}</p>

        <div className="card-price-section">
          <div className="price-info">
            <span className="old-price">R$ {priceOld.toFixed(2)}</span>
            <span className="new-price">R$ {price.toFixed(2)}</span>
          </div>
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
