import { useEffect, useState } from 'react';
import './Hoquei.css';
import { Link } from 'react-router-dom';

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
    performance: [
      { label: 'Price:', value: '$73,400' },
    ],
  },
  {
    backgroundImage: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
    number: '02',
    brand: 'Lamborghini Huracán',
    name: 'Lamborghini Huracán',
    subtitle: 'Naturally Aspirated V10 Excellence',
    specs: [],
    performance: [
      { label: 'Price:', value: '$248,295' },
    ],
  },
  {
    backgroundImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    number: '03',
    brand: 'Ferrari SF90',
    name: 'Ferrari SF90 Stradale',
    subtitle: 'Plug-in Hybrid Revolution',
    specs: [],
    performance: [
      { label: 'Price:', value: '$625,000' },
    ],
  },
  {
    backgroundImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    number: '04',
    brand: 'Porsche 911',
    name: 'Porsche 911 Turbo S',
    subtitle: 'Twin-Turbo Flat-Six Perfection',
    specs: [],
    performance: [
      { label: 'Price:', value: '$207,000' },
    ],
  },
];

export default function Hoquei() {
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
      <h2 className="h2C">Produtos em Destaque</h2>
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
                    <button className='car-button'>Comprar</button>
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

      <h2 className="h2C">Mais produtos</h2>
      <div className="vendidos">
        
      </div>

      <div className="grid-produtos">
        {/* aqui vai ter um grid de Card do components/Card/Card */}
      </div>
    </section>
  );
}
