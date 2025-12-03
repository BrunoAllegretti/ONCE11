import { useContext, useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import './CartItem.css';
import AppContext from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { Product } from '../Products';

type CartItemProps = {
  data: Product & { quantity: number };
};

export default function CartItem({ data }: CartItemProps) {
  const context = useContext(AppContext);
  const { t } = useLanguage();

  if (!context) return null;

  const { removeFromCart, updateQuantity } = context;

  const { _id, image, name, price, quantity } = data;

  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveItem = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromCart(_id);
    }, 300);
  };

  const handleIncreaseQuantity = () => {
    updateQuantity(_id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(_id, quantity - 1);
    } else {
      handleRemoveItem();
    }
  };

  const productDetails = {
    proportions: '129cm (h) x 82cm (w)',
    size: (data as any).size || 'M',
    color: 'Produto Oficial',
  };

  return (
    <section className={`cart-item ${isRemoving ? 'removing' : ''}`}>
      
      {/* Parte de cima */}
      <div className="cart-item-top">
        <img src={`/ONCE11/Products/${image}`} alt={name} className="cart-item-image" />

        <div className="cart-item-content">
          <h3 className="cart-item-title">{name}</h3>

          <div className="cart-item-details">
            <p>Proporções: {productDetails.proportions}</p>
            <p>{t('label_size')} {productDetails.size}</p>
            <p>{t('label_color')} {productDetails.color}</p>
          </div>
        </div>
      </div>

      <hr className="hrcart" />

      {/* Parte inferior */}
      <div className="cart-item-bottom">

        {/* Controle de quantidade */}
        <div className="cart-item-quantity-control">
          <span>{t('label_quantity')}</span>

          <button
            type="button"
            className="quantity-button"
            onClick={handleDecreaseQuantity}
            disabled={isRemoving}
            title={t('button_decrease_quantity')}
          >
            <AiOutlineMinus />
          </button>

          <input
            type="text"
            className="quantity-input"
            value={quantity}
            readOnly
          />

          <button
            type="button"
            className="quantity-button"
            onClick={handleIncreaseQuantity}
            disabled={isRemoving}
            title={t('button_increase_quantity')}
          >
            <AiOutlinePlus />
          </button>
        </div>

        {/* Preço */}
        <div className="cart-item-price-container">
          <h3 className="cart-item-price">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price * quantity)}
          </h3>
        </div>
      </div>

      {/* Botão para remover item */}
      {/* Se quiser no topo direito, descomente */}
      {/*
      <button
        type="button"
        className="button__remove-item"
        onClick={handleRemoveItem}
        disabled={isRemoving}
      >
        <BsCartDashFill />
      </button>
      */}
    </section>
  );
}
