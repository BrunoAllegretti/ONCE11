import { FaShoppingCart } from "react-icons/fa";
import "./Card.css";
import { useLanguage } from "../../context/LanguageContext";
import { Product } from "../../services/api";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import AppContext from "../../context/AppContext";

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(UserContext) as any;
  const context = useContext(AppContext);
  
  if (!context) return null;
  const { addToCart } = context;

  if (!product || !product._id || !product.name) {
    return <div className="cardProd">{t('message_invalid_product')}</div>;
  }

  const name = product.name || "Sem nome";
  const image = product.image || "";
  const description = product.description || "Sem descrição";
  const price = product.price ?? 0;

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  // Manipula clique no card (mas não no botão de carrinho)
  function handleCardClick(e: React.MouseEvent<HTMLDivElement>) {
    // Evita navegação se for no botão
    if ((e.target as Element).closest('.cartButton')) return;
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/buy', { state: { product } });
    }
  }

  // Adiciona ao carrinho
  function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    addToCart(product);
    
    // Feedback visual
    const button = e.currentTarget;
    button.style.transform = 'scale(0.95)';
    button.textContent = '✓ Adicionado!';
    setTimeout(() => {
      button.style.transform = '';
      const icon = button.querySelector('svg');
      if (icon) {
        button.innerHTML = '';
        button.appendChild(icon);
        button.appendChild(document.createTextNode(` ${t('button_add_to_cart_card')}`));
      }
    }, 1500);
  }

  return (
    <div className="cardProd" onClick={handleCardClick}>
            <img src={`/ONCE11/Products/${image}`} alt={name} />
      <section>
        <div className="headerCard">
          <h2 className="titleCard">{name}</h2>
          <h2 className="priceCard">{formattedPrice}</h2>
        </div>
        <p className="descriptionCard">{description}</p>
        <div>
          <button className="cartButton" onClick={handleAddToCart}>
            <FaShoppingCart /> {t('button_add_to_cart_card')}
          </button>
        </div>
      </section>
    </div>
  );
}