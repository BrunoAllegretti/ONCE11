import { useContext } from 'react';
import './Products.css';
import { Product } from '../Products';
import AppContext from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';

type ProductCardProps = {
  data: Product;
};

export default function ProductCard({ data }: ProductCardProps) {
  const context = useContext(AppContext);
  const { t } = useLanguage();

  if (!context) return null;

  const { cartItems, setCartItems } = context;

  const handleAddCart = () => {
    const existingItem = cartItems.find((item) => item.id === data.id);

    if (existingItem) {
      // Produto já está no carrinho, aumenta a quantidade
      const updatedCartItems = cartItems.map((item) =>
        item.id === data.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      // Produto novo no carrinho, adiciona com quantity: 1
      setCartItems([...cartItems, { ...data, quantity: 1 }]);
    }
  };

  return (
    <section className="product-card">
      <img
        src={data.image}
        alt={data.name}
        className="card__image"
      />

      <div className="card__infos">
        <h2 className="card__name">{data.name}</h2>
        <h2 className="card__desc">{data.description}</h2>
        <h2 className="card__price">R$ {data.price.toFixed(2)}</h2>

        <button
          type="button"
          className="button__add-cart"
          onClick={handleAddCart}
        >
          {t('button_add_to_cart_product_card')}
        </button>
      </div>
    </section>
  );
}
