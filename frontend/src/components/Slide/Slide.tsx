import { useEffect, useState } from 'react';
import './Slide.css';
import { useLanguage } from '../../context/LanguageContext';
import { fetchProducts, Product } from '../../services/api';

interface FeaturedProduct extends Product {
  bgColor: string;
  accentColor: string;
}

export default function Slide() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  // Paleta de cores para os produtos (baseada nas cores reais)
  const colorPalettes = [
    { bgColor: '#000000', accentColor: '#1E40FF' },      // Preto e Azul - Asics
    { bgColor: '#FFB300', accentColor: '#FF6F00' },      // Amarelo e Laranja - Mizuno
    { bgColor: '#000000', accentColor: '#FFFFFF' },      // Preto e Branco - Qix
    { bgColor: '#E3F2FD', accentColor: '#FFFFFF' },      // Branco - Adidas
    { bgColor: '#424242', accentColor: '#9E9E9E' }       // Cinza - Under Armour
  ];

  // IDs dos produtos em destaque (ordem específica)
  const featuredIds = [
    '692fb361b46cc52eaf72b011', // Tênis Asics Gel-Impression 11 Feminino
    '692fb361b46cc52eaf72b012', // Chuteira Campo Mizuno Morelia Club
    '692fb361b46cc52eaf72b013', // Tênis Qix Trek Cleveland Collab Kings
    '692fb361b46cc52eaf72b014', // Bola Adidas Trionda Copa 2026
    '692fb361b46cc52eaf72b015'  // Tênis Under Armour Bankshot
  ];

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await fetchProducts();
        
        // Filtrar e ordenar produtos em destaque pelos IDs específicos
        const featured = featuredIds
          .map(id => allProducts.find(product => product._id === id))
          .filter(product => product !== undefined)
          .map((product, index) => ({
            ...product!,
            ...colorPalettes[index % colorPalettes.length]
          }));

        setFeaturedProducts(featured);
      } catch (error) {
        console.error('Erro ao carregar produtos em destaque:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  const totalSlides = featuredProducts.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-play do carrossel
  useEffect(() => {
    if (featuredProducts.length === 0) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, featuredProducts.length]);

  if (loading) {
    return (
      <div className="slide-container">
        <div className="slide-loading">
          <div className="loading-spinner"></div>
          <p>Carregando produtos em destaque...</p>
        </div>
      </div>
    );
  }

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <div className="slide-container">
      <div
        className="slide-content"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {featuredProducts.map((product, index) => (
          <div 
            className={`slide-item ${currentSlide === index ? 'active' : ''}`}
            key={product._id}
            style={{ 
              '--bg-color': product.bgColor,
              '--accent-color': product.accentColor
            } as React.CSSProperties}
          >
            <div className="slide-text-section">
              <span className="featured-badge">{t('featured')}</span>
              <h2 className="product-title">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <div className="price-section">
                <span className="price-label">Apenas</span>
                <span className="product-price">R$ {product.price.toFixed(2)}</span>
              </div>
              <button className="slide-button">
                {t('button_buy_slide')}
                <span className="button-arrow">→</span>
              </button>
            </div>

            <div className="slide-image-section">
              <div className="image-decoration">
                <div className="circle-bg"></div>
                <div className="floating-shapes">
                  <div className="shape shape-1"></div>
                  <div className="shape shape-2"></div>
                  <div className="shape shape-3"></div>
                </div>
              </div>
              <img 
                src={`Products/${product.image}`}
                alt={product.name}
                className="product-image"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores de slides */}
      <div className="slide-indicators">
        {featuredProducts.map((_, index) => (
          <button
            key={index}
            className={`indicator ${currentSlide === index ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Botões de navegação */}
      <div className="slide-nav-buttons">
        <button
          className="slide-nav-button prev-button"
          onClick={prevSlide}
          aria-label="Slide anterior"
        >
          &#10094;
        </button>
        <button
          className="slide-nav-button next-button"
          onClick={nextSlide}
          aria-label="Próximo slide"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}

