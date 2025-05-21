import "./Card2.css";

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
      <img src={image} alt={name} className="card2-img" />
      <h2 className="card2-title">{name}</h2>
      <p className="card2-description">
        {description}
      </p>
      <div className="card2-price">
        <span className="new-price2">{"R$" + price.toFixed(2)}</span>
      </div>
      <button className="card2-button">
        Comprar
      </button>
    </div>
  );
}
