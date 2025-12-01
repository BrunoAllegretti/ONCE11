import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import Card from '../Card/Card';
import './Carousel.css';

// Mock Product interface based on Card.tsx usage
// Em um projeto real, esta interface viria de um arquivo de tipos compartilhado
interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
}

// Mock data para 6 produtos
const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'Tênis Basquete A',
    image: 'https://via.placeholder.com/400x500/0000FF/FFFFFF?text=Produto+1',
    description: 'O melhor tênis para quadras indoor.',
    price: 499.90,
  },
  {
    _id: '2',
    name: 'Camisa Time B',
    image: 'https://via.placeholder.com/400x500/FF0000/FFFFFF?text=Produto+2',
    description: 'Camisa oficial da temporada 2024.',
    price: 199.90,
  },
  {
    _id: '3',
    name: 'Bola Oficial C',
    image: 'https://via.placeholder.com/400x500/00FF00/FFFFFF?text=Produto+3',
    description: 'Bola de basquete com grip profissional.',
    price: 149.90,
  },
  {
    _id: '4',
    name: 'Shorts D',
    image: 'https://via.placeholder.com/400x500/FFFF00/000000?text=Produto+4',
    description: 'Shorts leve e respirável para jogos.',
    price: 99.90,
  },
  {
    _id: '5',
    name: 'Meia E',
    image: 'https://via.placeholder.com/400x500/FF00FF/FFFFFF?text=Produto+5',
    description: 'Meias de compressão para alta performance.',
    price: 49.90,
  },
  {
    _id: '6',
    name: 'Protetor F',
    image: 'https://via.placeholder.com/400x500/00FFFF/000000?text=Produto+6',
    description: 'Protetor bucal essencial para o jogo.',
    price: 29.90,
  },
];

export default function Carrossel3D() {
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
      slideShadows: true
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
        {mockProducts.map((product, index) => (
          <SwiperSlide key={index} className="swiper-slide-card">
            {/* O Card.tsx já tem a estrutura de um slide */}
            <Card product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
