import './Carousel.css'
import { useRef } from 'react';
import Card from '../SecProducts2/Card';
import Logo from '../../assets/img/logo_sem_fundo.png';

// Importar as imagens dos produtos diretamente
import OlympikusVenumImage from '../../assets/img/Products/OlympikusVenum.webp';
import NikeLeBronWitness8Image from '../../assets/img/Products/NikeLeBronWitness8.webp';
import AsicsUpcourtImage from '../../assets/img/Products/AsicsUpcourt.jpg';
import AdidasAlphaedgeImage from '../../assets/img/Products/AdidasAlphaedge.avif';
import NewBalanceImage from '../../assets/img/Products/NewBalance.jpg';
import VansFilmoreImage from '../../assets/img/Products/VansFilmore.jpg';
import AsicsGelCumulusImage from '../../assets/img/Products/AsicsGelCumulus.avif';
import SneakerBrancoImage from '../../assets/img/Products/SneakerBranco.jpg';


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

// A constante BASE_URL não é mais necessária, pois as imagens são importadas diretamente.
// const BASE_URL = "http://localhost:3001";

export const produto: ProductList = {
  maisComprados: [
    {
      id: 1,
      name: "Olympikus Venum",
      image: OlympikusVenumImage, // Usando a imagem importada
      description: "Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados",
      priceOld: 799.99,
      price: 549.99,
      filters: ["calçado", "futebol"],
    },
    {
      id: 2,
      name: "Nike LeBron Witness 8",
      image: NikeLeBronWitness8Image, // Usando a imagem importada
      description: "Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados",
      priceOld: 799.99,
      price: 549.99,
      filters: ["calçado", "futsal"],
    },
    {
      id: 3,
      name: "Asics Upcourt 4",
      image: AsicsUpcourtImage, // Usando a imagem importada
      description: "Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados",
      priceOld: 799.99,
      price: 549.99,
      filters: ["calçado", "basquete"],
    },
    {
      id: 4,
      name: "Adidas Alphaedge+",
      image: AdidasAlphaedgeImage, // Usando a imagem importada
      description: "Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados",
      priceOld: 799.99,
      price: 549.99,
      filters: ["calçado", "volei"],
    },
    {
      id: 5,
      name: "New Balance 520",
      image: NewBalanceImage, // Usando a imagem importada
      description: "Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados",
      priceOld: 799.99,
      price: 79.99,
      filters: ["calçado", "futebol"],
    },
    {
      id: 6,
      name: "Vans Filmore",
      image: VansFilmoreImage, // Usando a imagem importada
      description: "Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados",
      priceOld: 799.99,
      price: 549.99,
      filters: ["calçado", "futebol"],
    },
    {
      id: 7,
      name: "Asics Gel-Cumulus 24",
      image: AsicsGelCumulusImage, // Usando a imagem importada
      description: "Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados",
      priceOld: 799.99,
      price: 549.99,
      filters: ["calçado", "futebol"],
    },
    {
      id: 8,
      name: "Sneaker Branco",
      image: SneakerBrancoImage, // Usando a imagem importada
      description: "Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados",
      priceOld: 799.99,
      price: 549.99,
      filters: ["calçado", "futebol"],
    },
  ],
  camisas: [],
  futebol: [],
  basquete: [],
  voleibol: [],
  futsal: [],
  outros: []
};


export default function Carousel( ) {

    const containerRef = useRef<HTMLDivElement>(null);
    let isDown = false;

    let startX = 0;
    let scrollLeft = 0;

    const ButtonPressed  = (e: React.MouseEvent) => {
        const container = containerRef.current!;
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    };

    const handleMouseLeaveOrUp = () => {
        isDown = false;
    };
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const container = containerRef.current!;
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1;
        container.scrollLeft = scrollLeft - walk;
    };

    const produtosMaisComprados = produto.maisComprados;

    return (
        <div className="containerC" id="cards"
            ref={containerRef}
            onMouseDown={ButtonPressed}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
        >
            <img src={Logo} alt="" className="logoOnce" />
            <h2 className="title-carousel">TOP VENDAS<br /></h2>
            {produtosMaisComprados.map((produto) => (
                <Card
                    key={produto.id}
                    id={produto.id}
                    name={produto.name}
                    image={produto.image}
                    description={produto.description}
                    priceOld={produto.priceOld}
                    price={produto.price}
                />
            ))}
        </div>
    );
}
