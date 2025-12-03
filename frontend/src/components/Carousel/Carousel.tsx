import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import Card from '../Card/Card';
import './Carousel.css';
import { fetchProducts, Product } from '../../services/api';

interface CarouselProps {
  filter?: string; // Filtro opcional para carregar produtos específicos
}

export default function Carrossel3D({ filter }: CarouselProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await fetchProducts();
        
        let filtered = allProducts;
        
        // Se tiver filtro, aplicar filtro
        if (filter) {
          filtered = allProducts.filter(product => 
            product.filters.some(f => f.toLowerCase() === filter.toLowerCase()) &&
            product.isBestSeller === true &&
            !product.name.toLowerCase().includes('wilson evolution') &&
            product.name !== 'Bola de Basquete Wilson NCAA Oficial'
          );
        }
        
        // Limitar a 5 produtos
        setProducts(filtered.slice(0, 5));
      } catch (error) {
        console.error('Erro ao carregar produtos do carrossel:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [filter]);

  if (loading) {
    return <div className="carousel-3d-wrapper">Carregando produtos...</div>;
  }

  if (products.length === 0) {
    return <div className="carousel-3d-wrapper">Nenhum produto disponível.</div>;
  }
  const swiperParams = {
    effect: "coverflow" as const,
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto" as const,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false
    },
    pagination: {
      clickable: true,
    },
    modules: [EffectCoverflow, Pagination],
    // Breakpoints para responsividade
    breakpoints: {
      320: {
        slidesPerView: 1.5
      },
      580: {
        slidesPerView: 2
      },
      767: {
        slidesPerView: 3
      },
      992: {
        slidesPerView: 3.5
      },
      1200: {
        slidesPerView: 4
      },
      1400: {
        slidesPerView: 4.5
      }
    }
  };

  return (
    <div className="carousel-3d-wrapper">
      <Swiper {...swiperParams} className="swiper-3d-carousel">
        {products.map((product) => (
          <SwiperSlide key={product._id} className="swiper-slide-card">
            <Card product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
