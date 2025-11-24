import { FaShoppingCart } from "react-icons/fa";
import "./Card.css";
import { Product } from "../../services/api";

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  console.log("🟦 [Card] Renderizando produto:", product);

  // Se o produto vier undefined ou quebrado
  if (!product || !product._id || !product.name) {
    console.log("❌ [Card] Produto inválido detectado:", product);
    return <div className="cardProd">Produto inválido</div>;
  }

  // Garantir campos mínimos
  const name = product.name || "Sem nome";
  const image = product.image || "";
  const description = product.description || "Sem descrição";
  const price = product.price ?? 0;

  console.log("🟩 [Card] Dados finais:", {
    name,
    image,
    description,
    price
  });

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  return (
    <div className="cardProd">
      <img src={image} alt={name} />

      <section>
        <div className="headerCard">
          <h2 className="titleCard">{name}</h2>

          <h2 className="priceCard">{formattedPrice}</h2>
        </div>

        <p className="descriptionCard">{description}</p>

        <div>
          <button className="cartButton">
            <FaShoppingCart /> Adicionar no Carrinho
          </button>
        </div>
      </section>
    </div>
  );
}
