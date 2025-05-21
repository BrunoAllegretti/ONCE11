import "./Card.css";

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
      <img  draggable={false} src={image} alt={name} className="card-img" />
      <h2 className="card-title">{name}</h2>
      <p className="card-description">
        {description}
      </p>
      <div className="card-price">
        <span className="old-price">{priceOld}</span>
        <span className="new-price">{price.toFixed(2)}</span>
      </div>
      <button className="card-button">
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

