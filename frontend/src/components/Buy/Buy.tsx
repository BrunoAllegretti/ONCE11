import "./Buy.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useLanguage } from "../../context/LanguageContext";
import AppContext from "../../context/AppContext";

export default function Buy() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(UserContext) as any;
  const { addToCart } = useContext(AppContext) as any;
  const { t } = useLanguage();
  const location = useLocation();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!product) {
      navigate('/');
    }
  }, [isAuthenticated, product, navigate]);

  if (!product) return null;

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price ?? 0);

  const totalPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format((product.price ?? 0) * quantity);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity, size });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, quantity, size });
    navigate('/cart');
  };

  return (
    <div className="buy-page">
      <div className="buy-container">
        <button className="buy-back-btn" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          {t('button_back') || 'Voltar'}
        </button>

        <div className="buy-content">
          <div className="buy-image-section">
            <div className="buy-image-wrapper">
              <img src={`/ONCE11/Products/${product.image}`} alt={product.name} className="buy-image"/>
            </div>
            {product.filters && product.filters.length > 0 && (
              <div className="buy-tags">
                {product.filters.slice(0, 3).map((filter: string, index: number) => (
                  <span key={index} className="buy-tag">{filter}</span>
                ))}
              </div>
            )}
          </div>

          <div className="buy-details-section">
            <h1 className="buy-title">{product.name}</h1>
            <p className="buy-description">{product.description}</p>
            
            <div className="buy-price-section">
              <div className="buy-price-label">Preço unitário</div>
              <div className="buy-price">{formattedPrice}</div>
            </div>

            <div className="buy-options">
              <div className="buy-option-group">
                <label className="buy-label">Tamanho</label>
                <div className="buy-size-selector">
                  {['PP', 'P', 'M', 'G', 'GG'].map((s) => (
                    <button
                      key={s}
                      className={`buy-size-btn ${size === s ? 'active' : ''}`}
                      onClick={() => setSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="buy-option-group">
                <label className="buy-label">Quantidade</label>
                <div className="buy-quantity-selector">
                  <button 
                    className="buy-qty-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="buy-qty-display">{quantity}</span>
                  <button 
                    className="buy-qty-btn"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="buy-total">
              <span className="buy-total-label">Total</span>
              <span className="buy-total-price">{totalPrice}</span>
            </div>

            <div className="buy-actions">
              <button 
                className={`buy-cart-btn ${addedToCart ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {addedToCart ? '✓ Adicionado!' : 'Adicionar ao Carrinho'}
              </button>
              <button className="buy-now-btn" onClick={handleBuyNow}>
                Comprar Agora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}