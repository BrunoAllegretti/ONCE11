import { useEffect, useState } from 'react';
import './Basquete.css';
import { Link } from 'react-router-dom';
import Carrossel3D from '../Carousel/Carousel';
import Card from '../Card/Card';
import { useLanguage } from '../../context/LanguageContext';

// Mock Product interface e dados para o grid
interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  filters: string[];
}

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

interface Car {
  backgroundImage: string;
  number: string;
  brand: string;
  name: string;
  subtitle: string;
  specs: { label: string; value: string }[];
  performance: { label: string; value: string }[];
}

const cars: Car[] = [
  {
    backgroundImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    number: '01',
    brand: 'BMW M3',
    name: 'BMW M3 Competition',
    subtitle: 'Twin-Turbo Inline-6 Performance',
    specs: [],
    performance: [{ label: 'Price:', value: '$73,400' }],
  },
  {
    backgroundImage: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
    number: '02',
    brand: 'Lamborghini Huracán',
    name: 'Lamborghini Huracán',
    subtitle: 'Naturally Aspirated V10 Excellence',
    specs: [],
    performance: [{ label: 'Price:', value: '$248,295' }],
  },
  {
    backgroundImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    number: '03',
    brand: 'Ferrari SF90',
    name: 'Ferrari SF90 Stradale',
    subtitle: 'Plug-in Hybrid Revolution',
    specs: [],
    performance: [{ label: 'Price:', value: '$625,000' }],
  },
  {
    backgroundImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    number: '04',
    brand: 'Porsche 911',
    name: 'Porsche 911 Turbo S',
    subtitle: 'Twin-Turbo Flat-Six Perfection',
    specs: [],
    performance: [{ label: 'Price:', value: '$207,000' }],
  },
];

export default function Basquete() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const nextSlide = () => {
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % cars.length;
    setCurrentIndex(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = currentIndex === -1 ? cars.length - 1 : (currentIndex - 1 + cars.length) % cars.length;
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [currentIndex]);

  return (
    <section className="colecao">
      <h2 className="h2C">{t('heading_featured_products')}</h2>

      <div className="destaque">
        <div className="slider-container">
          <div className="accordion-slider">
            {cars.map((car, index) => {
              const price = car.performance.find(p => p.label === 'Price:')?.value || '';
              return (
                <div
                  key={index}
                  className={`slide ${currentIndex === index ? 'active' : ''}`}
                  style={{ backgroundImage: `url(${car.backgroundImage})` }}
                  onClick={() => setCurrentIndex(currentIndex === index ? -1 : index)}
                >
                  <div className="slide-content">
                    <div className="car-name">{car.name}</div>
                    <div className="car-subtitle">{car.subtitle}</div>
                    <div className="car-price">{price}</div>
                    <Link to="/" className="gohome">
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
      </div>

      <h2 className="h2C">{t('heading_more_products')}</h2>

      <div className="vendidos">
        <Carrossel3D />
      </div>

      <div className="grid-produtos">
        {gridProducts.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
