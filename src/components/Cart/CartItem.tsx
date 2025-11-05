import { useContext, useState } from 'react';
import { BsCartDashFill } from 'react-icons/bs';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'; // Ícones para controle de quantidade
import './CartItem.css';
import AppContext from '../../context/AppContext';
import { Product } from '../Products';

type CartItemProps = {
  data: Product & { quantity: number };
};

export default function CartItem({ data }: CartItemProps) {
  const context = useContext(AppContext);
  if (!context) return null;

  // Assumindo que o contexto tem funções para remover, aumentar e diminuir a quantidade
  const { removeFromCart, updateQuantity } = context; 
  const { id, image, name, price, quantity, oldPrice, details } = data; // Adicionando oldPrice e details para simular a imagem
  const [isRemoving, setIsRemoving] = useState(false);

  // Função para simular a remoção com animação
  const handleRemoveItem = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromCart(id);
    }, 300);
  };

  // Funções para controle de quantidade
  const handleIncreaseQuantity = () => {
    // updateQuantity(id, quantity + 1); // Descomentar quando a função estiver disponível no contexto
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      // updateQuantity(id, quantity - 1); // Descomentar quando a função estiver disponível no contexto
    } else {
      handleRemoveItem(); // Remove se a quantidade for 1
    }
  };

  // Simulação de detalhes do produto para o layout da imagem
  const productDetails = details || {
    proportions: '129cm (h) x 82cm (w)',
    size: 'G',
    color: 'Azul',
  };

  // Simulação de preço antigo para o layout da imagem
  const hasOldPrice = oldPrice && oldPrice > price;

  return (
    <section className={`cart-item ${isRemoving ? 'removing' : ''}`}>
      <img src={image} alt={`Imagem de ${name}`} className="cart-item-image" />

      <div className="cart-item-content">
        <h3 className="cart-item-title">{name}</h3>

        {/* Detalhes do produto para simular a imagem */}
        <div className="cart-item-details">
          <p>Proporções: {productDetails.proportions}</p>
          <p>Tamanho: {productDetails.size}</p>
          <p>Cor: {productDetails.color}</p>
        </div>

        <div className="cart-item-divider"></div>

        <div className="cart-item-bottom">
          {/* Controle de Quantidade */}
          <div className="cart-item-quantity-control">
            <span>Quantidade</span>
            <button
              type="button"
              className="quantity-button"
              onClick={handleDecreaseQuantity}
              disabled={isRemoving}
              title="Diminuir quantidade"
            >
              <AiOutlineMinus />
            </button>
            <input type="text" className="quantity-input" value={quantity} readOnly />
            <button
              type="button"
              className="quantity-button"
              onClick={handleIncreaseQuantity}
              disabled={isRemoving}
              title="Aumentar quantidade"
            >
              <AiOutlinePlus />
            </button>
          </div>

          {/* Preço */}
          <div className="cart-item-price-container">
            {hasOldPrice && (
              <span className="cart-item-old-price">
                {`R$ ${oldPrice.toFixed(2)}`}
              </span>
            )}
            <h3 className="cart-item-price">
              {`R$ ${(price * quantity).toFixed(2)}`}
            </h3>
          </div>
        </div>
      </div>

      {/* Botão de remover no canto superior direito (mantido do original, mas pode ser removido se o controle de quantidade for a única forma de remover) */}
      {/* <button
        type="button"
        className="button__remove-item"
        onClick={handleRemoveItem}
        disabled={isRemoving}
        title="Remover item do carrinho"
      >
        <BsCartDashFill />
      </button> */}
    </section>
  );
}
