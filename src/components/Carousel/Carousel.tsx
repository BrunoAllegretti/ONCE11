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
  filters: string[]; // Esta é a propriedade que está causando o erro
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
      name: "New Balance 520",
      image: NewBalanceImage,
      description: "Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados",
      priceOld: 799.99,
      price: 79.99,
      filters: ["calçado", "futebol"],
    },
    {
        id: 6,
        name: "Asics Upcourt 4",
        image: AsicsUpcourtImage,
        description: "Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados",
        priceOld: 799.99,
        price: 549.99,
        filters: ["calçado", "basquete"],
      },
    {
      id: 7,
      name: "Asics Gel-Cumulus 24",
      image: AsicsGelCumulusImage,
      description: "Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados",
      priceOld: 799.99,
      price: 549.99,
      filters: ["calçado", "futebol"],
    },
    {
      id: 8,
      name: "Sneaker Branco",
      image: SneakerBrancoImage,
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


export default function Carousel() {

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

            {/* Renderizando os 8 cards diretamente, passando 'filters' */}
            <Card
                key={produto.maisComprados[0].id}
                id={produto.maisComprados[0].id}
                name={produto.maisComprados[0].name}
                image={produto.maisComprados[0].image}
                description={produto.maisComprados[0].description}
                priceOld={produto.maisComprados[0].priceOld}
                price={produto.maisComprados[0].price}
                filters={produto.maisComprados[0].filters} // Adicionado
            />
            <Card
                key={produto.maisComprados[1].id}
                id={produto.maisComprados[1].id}
                name={produto.maisComprados[1].name}
                image={produto.maisComprados[1].image}
                description={produto.maisComprados[1].description}
                priceOld={produto.maisComprados[1].priceOld}
                price={produto.maisComprados[1].price}
                filters={produto.maisComprados[1].filters} // Adicionado
            />
            <Card
                key={produto.maisComprados[2].id}
                id={produto.maisComprados[2].id}
                name={produto.maisComprados[2].name}
                image={produto.maisComprados[2].image}
                description={produto.maisComprados[2].description}
                priceOld={produto.maisComprados[2].priceOld}
                price={produto.maisComprados[2].price}
                filters={produto.maisComprados[2].filters} // Adicionado
            />
            <Card
                key={produto.maisComprados[3].id}
                id={produto.maisComprados[3].id}
                name={produto.maisComprados[3].name}
                image={produto.maisComprados[3].image}
                description={produto.maisComprados[3].description}
                priceOld={produto.maisComprados[3].priceOld}
                price={produto.maisComprados[3].price}
                filters={produto.maisComprados[3].filters} // Adicionado
            />
            <Card
                key={produto.maisComprados[4].id}
                id={produto.maisComprados[4].id}
                name={produto.maisComprados[4].name}
                image={produto.maisComprados[4].image}
                description={produto.maisComprados[4].description}
                priceOld={produto.maisComprados[4].priceOld}
                price={produto.maisComprados[4].price}
                filters={produto.maisComprados[4].filters} // Adicionado
            />
            <Card
                key={produto.maisComprados[5].id}
                id={produto.maisComprados[5].id}
                name={produto.maisComprados[5].name}
                image={produto.maisComprados[5].image}
                description={produto.maisComprados[5].description}
                priceOld={produto.maisComprados[5].priceOld}
                price={produto.maisComprados[5].price}
                filters={produto.maisComprados[5].filters} // Adicionado
            />
            <Card
                key={produto.maisComprados[6].id}
                id={produto.maisComprados[6].id}
                name={produto.maisComprados[6].name}
                image={produto.maisComprados[6].image}
                description={produto.maisComprados[6].description}
                priceOld={produto.maisComprados[6].priceOld}
                price={produto.maisComprados[6].price}
                filters={produto.maisComprados[6].filters} // Adicionado
            />
            <Card
                key={produto.maisComprados[7].id}
                id={produto.maisComprados[7].id}
                name={produto.maisComprados[7].name}
                image={produto.maisComprados[7].image}
                description={produto.maisComprados[7].description}
                priceOld={produto.maisComprados[7].priceOld}
                price={produto.maisComprados[7].price}
                filters={produto.maisComprados[7].filters} // Adicionado
            />
        </div>
    );
}
