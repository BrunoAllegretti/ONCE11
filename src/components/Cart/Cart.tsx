import { useContext, useState, useEffect } from 'react';
import './Cart.css';
import CartItem from './CartItem';
import AppContext from '../../context/AppContext';
import { Product } from '../Products';

interface CardInfo {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

export default function Cart() {
  const context = useContext(AppContext);
  if (!context) return null;

  const { cartItems } = context;

  const totalPrice = cartItems.reduce((acc: number, item: Product & { quantity: number }) => acc + item.price * item.quantity, 0);

  // Estados para a funcionalidade de pagamento
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' ou 'payment'
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [pixCode, setPixCode] = useState('');

  // Gerar código PIX aleatório ao carregar o componente ou quando o total mudar
  useEffect(() => {
    setPixCode(`ONCE11${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
  }, [totalPrice]); // Depende de totalPrice para regenerar se o total mudar

  const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo({
      ...cardInfo,
      [name]: value
    });
  };

  const handleContinueToPayment = () => {
    setCheckoutStep('payment');
  };

  const handleFinalizePurchase = () => {
    if (!paymentMethod) {
      alert('Por favor, selecione um método de pagamento');
      return;
    }

    if (paymentMethod === 'card' && (!cardInfo.number || !cardInfo.name || !cardInfo.expiry || !cardInfo.cvv)) {
      alert('Por favor, preencha todos os dados do cartão');
      return;
    }

    alert('Compra finalizada com sucesso!'); 
    setCheckoutStep('confirmation');
  };

  return (
    <section className="cart-page-container">
      {checkoutStep === 'cart' && (
        <section className="cart">
          <h2 className="cart-title">Meu Carrinho</h2>

          <div className="cart-items">
            {cartItems.length > 0 ? (
              cartItems.map((cartItem: Product & { quantity: number }) => (
                <CartItem key={cartItem.id} data={cartItem} />
              ))
            ) : (
              <p className="empty-cart">Seu carrinho está vazio.</p>
            )}
          </div>

          <div className="cart-resume">
            <div className="resume">
              <h2 className="cartH2">
                Total :
              </h2>
              <h2 className="total">
                {` R$   ${totalPrice.toFixed(2)}`}
              </h2>
            </div>
            <input
              className='cupom'
              type="text"
              placeholder="Cupom promocional"
            />
          </div>

          <div className="cartB">
            <button className='continue' onClick={handleContinueToPayment}>Continuar</button>
          </div>
        </section>
      )}

      {checkoutStep === 'payment' && (
        <div className="payment-content">
          <h1>Método de Pagamento</h1>

          <div className="payment-methods">
            <div className="payment-method-selection">
              <div
                className={`payment-method ${paymentMethod === 'card' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="payment-method-icon">💳</div>
                <div className="payment-method-name">Cartão de Crédito</div>
              </div>

              <div
                className={`payment-method ${paymentMethod === 'pix' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('pix')}
              >
                <div className="payment-method-icon">📱</div>
                <div className="payment-method-name">PIX</div>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="card-payment-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Número do Cartão</label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      name="number"
                      value={cardInfo.number}
                      onChange={handleCardInfoChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Nome no Cartão</label>
                    <input
                      type="text"
                      placeholder="Nome como está no cartão"
                      name="name"
                      value={cardInfo.name}
                      onChange={handleCardInfoChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Validade</label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      name="expiry"
                      value={cardInfo.expiry}
                      onChange={handleCardInfoChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      name="cvv"
                      value={cardInfo.cvv}
                      onChange={handleCardInfoChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Parcelamento</label>
                    <select>
                      <option value="1">À vista - R$ {totalPrice.toFixed(2)}</option>
                      <option value="2">2x de R$ {(totalPrice / 2).toFixed(2)}</option>
                      <option value="3">3x de R$ {(totalPrice / 3).toFixed(2)}</option>
                      <option value="4">4x de R$ {(totalPrice / 4).toFixed(2)}</option>
                      <option value="5">5x de R$ {(totalPrice / 5).toFixed(2)}</option>
                      <option value="6">6x de R$ {(totalPrice / 6).toFixed(2)}</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'pix' && (
              <div className="pix-payment-info">
                <div className="pix-code-container">
                  <h3>Código PIX</h3>
                  <div className="pix-code">{pixCode}</div>
                  <button className="copy-pix-button" onClick={() => navigator.clipboard.writeText(pixCode)}>Copiar Código</button>
                </div>
                <div className="pix-instructions">
                  <p>1. Abra o aplicativo do seu banco</p>
                  <p>2. Escolha a opção PIX</p>
                  <p>3. Cole o código acima</p>
                  <p>4. Confirme o pagamento de R$ {totalPrice.toFixed(2)}</p>
                  <p>5. Volte aqui e clique em "Finalizar Compra"</p>
                </div>
              </div>
            )}
          </div>

          <div className="payment-summary">
            <h3>Resumo do Pedido</h3>
            <div className="cart-summary-row">
              <span>Total</span>
              <span>R$ {totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="payment-actions">
            <button className="back-button" onClick={() => setCheckoutStep('cart')}>
              Voltar para o Carrinho
            </button>
            <button className="checkout-button" onClick={handleFinalizePurchase}>
              Finalizar Compra
            </button>
          </div>
        </div>
      )}

      {checkoutStep === 'confirmation' && (
        <div className="confirmation-content">
          <div className="confirmation-icon">✓</div>
          <h1>Pedido Confirmado!</h1>
          <p className="confirmation-message">
            Seu pedido foi realizado com sucesso e está sendo processado.
          </p>
          <div className="order-details">
            <h3>Detalhes do Pedido</h3>
            <p><strong>Número do Pedido:</strong> #ONCE{Math.floor(Math.random() * 10000)}</p>
            <p><strong>Data:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>Método de Pagamento:</strong> {paymentMethod === 'card' ? 'Cartão de Crédito' : 'PIX'}</p>
            <p><strong>Total:</strong> R$ {totalPrice.toFixed(2)}</p>
          </div>
          <p className="confirmation-email">
            Enviamos um e-mail com os detalhes da sua compra.
          </p>
          <button className="continue-shopping" onClick={() => window.location.href = '/'}>
            Continuar Comprando
          </button>
        </div>
      )}
    </section>
  );
}
