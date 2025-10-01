import './SecProducts.css'
import Card from '../CardCart.tsx' 
import React, { useState } from 'react';

// Importar as imagens dos produtos diretamente
import OlympikusVenumImage from '../../assets/img/Products/OlympikusVenum.webp';
import NikeLeBronWitness8Image from '../../assets/img/Products/NikeLeBronWitness8.webp';
import AsicsUpcourtImage from '../../assets/img/Products/AsicsUpcourt.jpg';
import AdidasAlphaedgeImage from '../../assets/img/Products/AdidasAlphaedge.avif';

// Interfaces e dados movidos de Products.ts para cá
export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  priceOld: number;
  price: number;
  filters: string[];
  quantity?: number;
}

export interface ProductList {
  maisComprados: Product[];
  camisas: Product[];
  futebol: Product[];
  basquete: Product[];
  voleibol: Product[];
  futsal: Product[];
  outros: Product[];
}

export const produto: ProductList = {
  maisComprados: [
    {
      id: 1,
      name: "Olympikus Venum",
      image: OlympikusVenumImage,
      description: "Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados",
      priceOld: 799.99,
      price: 549.99,
      filters: ["calçado", "futebol"],
    },
    {
      id: 2,
      name: "Nike LeBron Witness 8",
      image: NikeLeBronWitness8Image,
      description: "Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados",
      priceOld: 799.99,
      price: 549.99,
      filters: ["calçado", "futsal"],
    },
    {
      id: 3,
      name: "Asics Upcourt 4",
      image: AsicsUpcourtImage,
      description: "Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados",
      priceOld: 799.99,
      price: 549.99,
      filters: ["calçado", "basquete"],
    },
    {
      id: 4,
      name: "Adidas Alphaedge+",
      image: AdidasAlphaedgeImage,
      description: "Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados",
      priceOld: 799.99,
      price: 549.99,
      filters: ["calçado", "volei"],
    },
    {
      id: 5,
      name: "Produto 5",
      image: OlympikusVenumImage,
      description: "Descrição do produto 5",
      priceOld: 899.99,
      price: 649.99,
      filters: ["calçado", "corrida"],
    },
    {
      id: 6,
      name: "Produto 6",
      image: NikeLeBronWitness8Image,
      description: "Descrição do produto 6",
      priceOld: 999.99,
      price: 749.99,
      filters: ["calçado", "treino"],
    },
  ],
  camisas: [],
  futebol: [],
  basquete: [],
  voleibol: [],
  futsal: [],
  outros: []
};

export default function SecProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalItems = produto.maisComprados.length;
  const maxIndex = Math.max(0, totalItems - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="carousel-container">
      <button 
        className="carousel-btn carousel-btn-prev" 
        onClick={prevSlide}
        disabled={currentIndex === 0}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>
      
      <div className="secProducts">
        <h2>Produtos</h2>
        <div 
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`
          }}
        >
          {produto.maisComprados.map((item: Product) => (
            <div key={item.id} className="carousel-item">
              <Card
                id={item.id}
                name={item.name}
                image={item.image}
                description={item.description}
                price={item.price}
                priceOld={item.priceOld}
              />
            </div>
          ))}
        </div>
      </div>
      
      <button 
        className="carousel-btn carousel-btn-next" 
        onClick={nextSlide}
        disabled={currentIndex === maxIndex}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9,18 15,12 9,6"></polyline>
        </svg>
      </button>
    </div>
  );
}
