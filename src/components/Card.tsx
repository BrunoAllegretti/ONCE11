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
      <div>
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p>{description}</p>
        <div>
          <span>{priceOld}</span>
          <span>{price.toFixed(2)}</span>
        </div>
        <button>Adicionar ao Carrinho</button>
      </div>
    );
  }
  