import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import CartItem from './CartItem';
import AppContext from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { Product } from '../Products';

interface CardInfo {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

export default function Cart() {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const { t } = useLanguage();

  if (!context) return null;

  const { cartItems, setCartItems } = context;

  const totalPrice = cartItems.reduce(
    (acc: number, item: Product & { quantity: number }) =>
      acc + item.price * item.quantity,
    0
  );

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'payment' | 'confirmation'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix' | ''>('');
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [pixCode, setPixCode] = useState('');
  const [couponCode, setCouponCode] = useState('');

  useEffect(() => {
    setPixCode(`ONCE11${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
  }, [totalPrice]);

  const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
  };

  const handleContinueToPayment = () => {
    if (cartItems.length === 0) {
      alert(t('message_empty_cart'));
      return;
    }
    setCheckoutStep('payment');
  };

  const handleFinalizePurchase = () => {
    if (!paymentMethod) {
      alert(t('heading_payment_method'));
      return;
    }

    if (
      paymentMethod === 'card' &&
      (!cardInfo.number || !cardInfo.name || !cardInfo.expiry || !cardInfo.cvv)
    ) {
      alert(t('label_card_number'));
      return;
    }

    alert(t('message_order_success'));
    setCheckoutStep('confirmation');

    if (setCartItems) setCartItems([]);
  };

  const copyPixCode = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      alert(t('button_copy_pix_code'));
    } catch (err) {
      console.error('Erro ao copiar código PIX:', err);
      alert(t('button_copy_pix_code'));
    }
  };

  return (
    <section className="cart-page-container">
      {/* --- ETAPA 1: Carrinho --- */}
      {checkoutStep === 'cart' && (
        <>
          <div className="cart">
            <div className="cart-items">
              {cartItems.length > 0 ? (
                cartItems.map((cartItem: Product & { quantity: number }) => (
                  <CartItem key={cartItem.id} data={cartItem} />
                ))
              ) : (
                <p className="empty-cart">
                  {t('message_empty_cart')}<br />
                  {t('message_add_products_to_continue')}
                </p>
              )}
            </div>
          </div>




        {/* ------------COLUNA DA DIREITA---------- */}
          <div className="cart-resume">
            <div className="resume">
              <div className="cart-summary-row">
                <span>{t('label_subtotal')}</span>
                <span>R$ {totalPrice.toFixed(2)}</span>
              </div>
              <hr className='row'/>

              <div className="cart-summary-row">
                <span>{t('label_shipping')}</span>
                <span>R$ 22,00</span>
              </div>
              <hr className='row'/>

              <div className="cupom-container">
                <input
                  className="cupom"
                  type="text"
                  placeholder={t('placeholder_promo_code')}
                  value={couponCode}
                  onChange={handleCouponChange}
                />
                <button className="cupom-button">{t('button_verify_coupon')}</button>
              </div>
              <hr className='row'/>

              <div className="cart-summary-row total">
                <span>{t('label_total')}</span>
                <span>R$ {(totalPrice + 22).toFixed(2)}</span>
              </div>

              <div className="payment-actions">
                <button className="checkout-button" onClick={handleContinueToPayment}>
                  {t('button_checkout')}
                </button>
                <button className="continue-shopping" onClick={() => navigate('/')}>
                  {t('button_continue_shopping')}
                </button>
              </div>

              <p className="delivery-time">
                {t('message_estimated_delivery_time')}
              </p>
            </div>
          </div>
        </>
      )}

      {/* --- ETAPA 2: Pagamento --- */}
      {checkoutStep === 'payment' && (
        <div className="payment-content">
          <h1>{t('heading_payment_method')}</h1>

          <div className="payment-methods">
            <div className="payment-method-selection">
              <div
                className={`payment-method ${paymentMethod === 'card' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="payment-method-icon">💳</div>
                <div className="payment-method-name">{t('label_credit_card')}</div>
              </div>

              <div
                className={`payment-method ${paymentMethod === 'pix' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('pix')}
              >
                <div className="payment-method-icon">📱</div>
                <div className="payment-method-name">{t('label_pix')}</div>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="card-payment-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>{t('label_card_number')}</label>
                    <input
                      type="text"
                      placeholder={t('placeholder_card_number')}
                      name="number"
                      value={cardInfo.number}
                      onChange={handleCardInfoChange}
                      maxLength={19}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>{t('label_card_name')}</label>
                    <input
                      type="text"
                      placeholder={t('placeholder_card_name')}
                      name="name"
                      value={cardInfo.name}
                      onChange={handleCardInfoChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>{t('label_expiry_date')}</label>
                    <input
                      type="text"
                      placeholder={t('placeholder_expiry_date')}
                      name="expiry"
                      value={cardInfo.expiry}
                      onChange={handleCardInfoChange}
                      maxLength={5}
                    />
                  </div>
                  <div className="form-group">
                    <label>{t('label_cvv')}</label>
                    <input
                      type="text"
                      placeholder={t('placeholder_cvv')}
                      name="cvv"
                      value={cardInfo.cvv}
                      onChange={handleCardInfoChange}
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>{t('label_installments')}</label>
                    <select>
                      <option value="1">{t('option_payment_cash')} - R$ {totalPrice.toFixed(2)}</option>
                      {[2, 3, 4, 5, 6].map(i => (
                        <option key={i} value={i}>
                          {i}x de R$ {(totalPrice / i).toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button className="finalize-button" onClick={handleFinalizePurchase}>
                  {t('button_finalize_purchase')}
                </button>
              </div>
            )}

            {paymentMethod === 'pix' && (
              <div className="pix-payment-info">
                <div className="pix-code-container">
                  <h3>{t('heading_pix_code')}</h3>
                  <div className="pix-code">{pixCode}</div>
                  <button className="copy-pix-button" onClick={copyPixCode}>
                    {t('button_copy_pix_code')}
                  </button>
                </div>
                <div className="pix-instructions">
                  <p>{t('instruction_open_bank_app')}</p>
                  <p>{t('instruction_choose_pix_option')}</p>
                  <p>{t('instruction_paste_code')}</p>
                  <p>{t('instruction_confirm_payment')} R$ {totalPrice.toFixed(2)}</p>
                  <p>{t('instruction_return_and_finalize')}</p>
                </div>
                <button className="finalize-button" onClick={handleFinalizePurchase}>
                  {t('button_finalize_purchase')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- ETAPA 3: Confirmação --- */}
      {checkoutStep === 'confirmation' && (
        <div className="confirmation-content">
          <div className="confirmation-icon">✓</div>
          <h1>{t('heading_order_confirmed')}</h1>
          <p className="confirmation-message">
            {t('message_order_success')}
          </p>
          <div className="order-details">
            <h3>{t('heading_order_details')}</h3>
            <p><strong>{t('label_order_number')}</strong> #ONCE{Math.floor(Math.random() * 10000)}</p>
            <p><strong>{t('label_date')}:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
            <p><strong>{t('label_payment_method_details')}:</strong> {paymentMethod === 'card' ? t('label_credit_card_payment_confirmation') : 'PIX'}</p>
            <p><strong>{t('label_total_confirmation')}:</strong> R$ {totalPrice.toFixed(2)}</p>
            <p><strong>{t('label_status')}:</strong> {t('label_processing_status')}</p>
          </div>
          <p className="confirmation-email">
            {t('message_email_sent_confirmation')}
          </p>
          <button className="continue-shopping" onClick={() => navigate('/')}>
            {t('button_continue_shopping_confirmation')}
          </button>
        </div>
      )}
    </section>
  );
}

  return (
    <section className="cart-page-container">
      {/* --- ETAPA 1: Carrinho --- */}
      {checkoutStep === 'cart' && (
        <>
          <div className="cart">
            <div className="cart-items">
              {cartItems.length > 0 ? (
                cartItems.map((cartItem: Product & { quantity: number }) => (
                  <CartItem key={cartItem.id} data={cartItem} />
                ))
              ) : (
                <p className="empty-cart">
                  🛒 Seu carrinho está vazio.<br />
                  Adicione alguns produtos para continuar!
                </p>
              )}
            </div>
          </div>




        {/* ------------COLUNA DA DIREITA---------- */}
          <div className="cart-resume">
            <div className="resume">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>R$ {totalPrice.toFixed(2)}</span>
              </div>
              <hr className='row'/>

              <div className="cart-summary-row">
                <span>Frete</span>
                <span>R$ 22,00</span>
              </div>
              <hr className='row'/>

              <div className="cupom-container">
                <input
                  className="cupom"
                  type="text"
                  placeholder="Adicionar Cupom Promocional"
                  value={couponCode}
                  onChange={handleCouponChange}
                />
                <button className="cupom-button">Verificar</button>
              </div>
              <hr className='row'/>

              <div className="cart-summary-row total">
                <span>Total</span>
                <span>R$ {(totalPrice + 22).toFixed(2)}</span>
              </div>

              <div className="payment-actions">
                <button className="checkout-button" onClick={handleContinueToPayment}>
                  Finalizar
                </button>
                <button className="continue-shopping" onClick={() => navigate('/')}>
                  Escolher Mais Produtos
                </button>
              </div>

              <p className="delivery-time">
                Prazo de Entrega estimado - Entre 15 - 45 dias da data do pedido
              </p>
            </div>
          </div>
        </>
      )}

      {/* --- ETAPA 2: Pagamento --- */}
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
                      maxLength={19}
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
                      maxLength={5}
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
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Parcelamento</label>
                    <select>
                      <option value="1">À vista - R$ {totalPrice.toFixed(2)}</option>
                      {[2, 3, 4, 5, 6].map(i => (
                        <option key={i} value={i}>
                          {i}x de R$ {(totalPrice / i).toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button className="finalize-button" onClick={handleFinalizePurchase}>
                  Finalizar Compra
                </button>
              </div>
            )}

            {paymentMethod === 'pix' && (
              <div className="pix-payment-info">
                <div className="pix-code-container">
                  <h3>Código PIX</h3>
                  <div className="pix-code">{pixCode}</div>
                  <button className="copy-pix-button" onClick={copyPixCode}>
                    Copiar Código PIX
                  </button>
                </div>
                <div className="pix-instructions">
                  <p>Abra o aplicativo do seu banco</p>
                  <p>Escolha a opção PIX</p>
                  <p>Cole o código acima</p>
                  <p>Confirme o pagamento de R$ {totalPrice.toFixed(2)}</p>
                  <p>Volte aqui e clique em "Finalizar Compra"</p>
                </div>
                <button className="finalize-button" onClick={handleFinalizePurchase}>
                  Finalizar Compra
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- ETAPA 3: Confirmação --- */}
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
            <p><strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
            <p><strong>Método de Pagamento:</strong> {paymentMethod === 'card' ? 'Cartão de Crédito' : 'PIX'}</p>
            <p><strong>Total:</strong> R$ {totalPrice.toFixed(2)}</p>
            <p><strong>Status:</strong> Processando</p>
          </div>
          <p className="confirmation-email">
            Enviamos um e-mail com os detalhes da sua compra para confirmação.
          </p>
          <button className="continue-shopping" onClick={() => navigate('/')}>
            Continuar Comprando
          </button>
        </div>
      )}
    </section>
  );
}
