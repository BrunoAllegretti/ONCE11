import "./Card2.css";
import { Link } from 'react-router-dom';

export type CardProps = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
};

export default function Card2({ id, name, image, description, price }: CardProps) {
  return (
    <div className="card2" key={id}>
      <div className="card2-img-container">
        <img src={image} alt={name} className="card2-img" />
      </div>
      <div className="card2-content">
        <h2 className="card2-title">{name}</h2>
        <p className="card2-description">
          {description}
        </p>
        <div className="card2-footer">
          <span className="new-price2">{"R$" + price.toFixed(2)}</span>
          <Link to="/buy" className="buy">
            <button className="card2-button">
              Comprar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
