import { useEffect, useState } from 'react';
import './SharedCollection.css';
import { Link } from 'react-router-dom';
import Carrossel3D from '../Carousel/Carousel';
import Card from '../Card/Card';
import { useLanguage } from '../../context/LanguageContext';
import { fetchProducts, Product } from '../../services/api';

const gridProducts: Product[] = [
  {
    _id: '7',
    name: 'Tênis Basquete G',
    image: 'https://via.placeholder.com/400x500/FF5733/FFFFFF?text=Produto+7',
    description: 'Tênis de alta performance para jogos.',
    price: 599.90,
    filters: ['Tênis', 'Performance'],
  },
  {
    _id: '8',
    name: 'Camiseta Treino H',
    image: 'https://via.placeholder.com/400x500/33FF57/000000?text=Produto+8',
    description: 'Camiseta leve e com tecnologia dry-fit.',
    price: 129.90,
    filters: ['Camiseta', 'Treino'],
  },
  {
    _id: '9',
    name: 'Meia Cano Alto I',
    image: 'https://via.placeholder.com/400x500/3357FF/FFFFFF?text=Produto+9',
    description: 'Meia de compressão com amortecimento.',
    price: 59.90,
    filters: ['Meia', 'Cano Alto'],
  },
  {
    _id: '10',
    name: 'Bermuda J',
    image: 'https://via.placeholder.com/400x500/FF33A1/FFFFFF?text=Produto+10',
    description: 'Bermuda com bolsos e ajuste na cintura.',
    price: 159.90,
    filters: ['Bermuda', 'Casual'],
  },
  {
    _id: '11',
    name: 'Caneleira K',
    image: 'https://via.placeholder.com/400x500/33FFF6/000000?text=Produto+11',
    description: 'Caneleira para proteção extra.',
    price: 79.90,
    filters: ['Acessório', 'Proteção'],
  },
  {
    _id: '12',
    name: 'Regata L',
    image: 'https://via.placeholder.com/400x500/FFC300/000000?text=Produto+12',
    description: 'Regata de basquete com design moderno.',
    price: 139.90,
    filters: ['Regata', 'Jogo'],
  },
  {
    _id: '13',
    name: 'Munhequeira M',
    image: 'https://via.placeholder.com/400x500/C70039/FFFFFF?text=Produto+13',
    description: 'Munhequeira para absorção de suor.',
    price: 39.90,
    filters: ['Acessório', 'Conforto'],
  },
  {
    _id: '14',
    name: 'Tênis Casual N',
    image: 'https://via.placeholder.com/400x500/900C3F/FFFFFF?text=Produto+14',
    description: 'Tênis casual com estilo basquete.',
    price: 399.90,
    filters: ['Tênis', 'Casual'],
  },
];

export default function Basquete() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [basketballProducts, setBasketballProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar produtos com filtros "destaque" e "basquete"
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await fetchProducts();
        
        // Filtrar produtos que têm AMBOS os filtros: "destaque" E "basquete"
        // E excluir "Bola de Basquete Wilson NCAA Oficial"
        const filtered = allProducts.filter(product => 
          product.filters.some(f => f.toLowerCase() === 'destaque') &&
          product.filters.some(f => f.toLowerCase() === 'basquete') &&
          product.name !== 'Bola de Basquete Wilson NCAA Oficial'
        );
        
        // Pegar apenas os 4 primeiros produtos
        setFeaturedProducts(filtered.slice(0, 4));

        // Filtrar produtos que NÃO são de basquete
        const nonBasketball = allProducts.filter(product =>
          !product.filters.some(f => f.toLowerCase() === 'basquete')
        );
        
        // Pegar apenas 8 produtos
        setBasketballProducts(nonBasketball.slice(0, 8));
      } catch (error) {
        console.error('Erro ao carregar produtos em destaque:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
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
    <section className="colecao basquete-bg">
      <h2 className="h2C">{t('heading_featured_products')}</h2>

      <div className="destaque">
        {loading ? (
          <div className="loading-container">
            <p>Carregando produtos em destaque...</p>
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="empty-container">
            <p>Nenhum produto em destaque disponível.</p>
          </div>
        ) : (
          <div className="slider-container">
            <div className="accordion-slider">
              {featuredProducts.map((product, index) => {
                return (
                  <div
                    key={product._id}
                    className={`slide ${currentIndex === index ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(currentIndex === index ? -1 : index)}
                  >
                    <img 
                      src={`/ONCE11/Products/${product.image}`} 
                      alt={product.name}
                      className="slide-image"
                    />
                    <div className="slide-content">
                      <div className="car-name">{product.name}</div>
                      <div className="car-subtitle">{product.description}</div>
                      <div className="car-price">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(product.price)}
                      </div>
                      <Link to="/buy" state={{ product }} className="gohome">
                        <button className='car-button'>{t('button_buy')}</button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="navigation-arrows nav-prev" onClick={prevSlide}>‹</button>
            <button className="navigation-arrows nav-next" onClick={nextSlide}>›</button>
          </div>
        )}
      </div>

      <h2 className="h2C">{t('heading_more_products')}</h2>

      <div className="vendidos">
        <Carrossel3D filter="basquete" />
      </div>

      <div className="grid-produtos">
        {basketballProducts.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
