import { useState } from "react";
import "./CardCart.css";

type CardProps = {
    id: number;
    name: string;
    image: string;
    description: string;
    priceOld: number;
    price: number;
};

export default function Card({ id, name, image, description, priceOld, price }: CardProps) {

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
        
        <button className="add-to-cart-btn">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
