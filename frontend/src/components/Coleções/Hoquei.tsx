import { useEffect, useState } from 'react';
import './SharedCollection.css';
import { Link } from 'react-router-dom';
import Carrossel3D from '../Carousel/Carousel';
import Card from '../Card/Card';
import { useLanguage } from '../../context/LanguageContext';
import { fetchProducts, Product } from '../../services/api';

export default function Hoquei() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [otherProducts, setOtherProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await fetchProducts();
        
        const filtered = allProducts.filter(product => 
          product.filters.some(f => f.toLowerCase() === 'destaque') &&
          product.filters.some(f => f.toLowerCase() === 'hóquei')
        );
        setFeaturedProducts(filtered.slice(0, 4));

        const others = allProducts.filter(product =>
          !product.filters.some(f => f.toLowerCase() === 'hóquei')
        );
        setOtherProducts(others.slice(0, 8));
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const nextSlide = () => {
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % featuredProducts.length;
    setCurrentIndex(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = currentIndex === -1 ? featuredProducts.length - 1 : (currentIndex - 1 + featuredProducts.length) % featuredProducts.length;
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [currentIndex, featuredProducts.length]);

  return (
    <section className="colecao hoquei-bg">
      <h2 className="h2C">{t('heading_featured_products')}</h2>

      <div className="destaque">
        {loading ? (
          <div className="loading-container"><p>Carregando produtos em destaque...</p></div>
        ) : featuredProducts.length === 0 ? (
          <div className="empty-container"><p>Nenhum produto em destaque disponível.</p></div>
        ) : (
          <div className="slider-container">
            <div className="accordion-slider">
              {featuredProducts.map((product, index) => (
                <div
                  key={product._id}
                  className={`slide ${currentIndex === index ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(currentIndex === index ? -1 : index)}
                >
                  <img src={`/ONCE11/Products/${product.image}`} alt={product.name} className="slide-image" />
                  <div className="slide-content">
                    <div className="car-name">{product.name}</div>
                    <div className="car-subtitle">{product.description}</div>
                    <div className="car-price">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                    </div>
                    <Link to="/buy" state={{ product }} className="gohome">
                      <button className='car-button'>{t('button_buy')}</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <button className="navigation-arrows nav-prev" onClick={prevSlide}>‹</button>
            <button className="navigation-arrows nav-next" onClick={nextSlide}>›</button>
          </div>
        )}
      </div>

      <h2 className="h2C">{t('heading_more_products')}</h2>
      <div className="vendidos">
        <Carrossel3D filter="hóquei" />
      </div>

      <div className="grid-produtos">
        {otherProducts.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
