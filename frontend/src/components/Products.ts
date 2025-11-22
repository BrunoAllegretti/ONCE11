export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  priceOld?: number;
  price: number;
  filters?: string[];
  quantity?: number;
  size?: string;
  type?: string;
  color?: string;
  isBestSeller?: boolean;
}

export interface ProductList {
  // Os dados agora virão da API, esta estrutura não é mais necessária.
  // maisComprados: Product[];
  camisas: Product[];
  // futebol: Product[];
  // basquete: Product[];
  // voleibol: Product[];
  // futsal: Product[];
  // outros: Product[];
}

// O código abaixo foi comentado pois os dados virão da API
/*
const BASE_URL = "http://localhost:3001";

export const produto: ProductList = {
  maisComprados: [
    {
      id: 1,
      name: "Olympikus Venum",
      image: `${BASE_URL}/assets/img/Products/OlympikusVenum.webp`,
      description: "Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados",
      priceOld: 799.99,
      price: 549.99,
      filters: ["calçado", "futebol"], // ✅ Correto
    },
    {
      id: 2,
      name: "Nike LeBron Witness 8",
      image: `${BASE_URL}/assets/img/Products/NikeLeBronWitness8.webp`,
      description: "Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados",
      priceOld: 799.99,
      price: 549.99,
      filters: ["calçado", "futsal"], // ✅ Correto
    },
    {
      id: 3,
      name: "Asics Upcourt 4",
      image: `${BASE_URL}/assets/img/Products/AsicsUpcourt.jpg`,
      description: "Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados",
      priceOld: 799.99,
      price: 549.99,
      filters: ["calçado", "basquete"], // ✅ Correto
    },
    {
      id: 4,
      name: "Adidas Alphaedge+",
      image: `${BASE_URL}/assets/img/Products/AdidasAlphaedge.avif`,
      description: "Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados",
      priceOld: 799.99,
      price: 549.99,
      filters: ["calçado", "volei"], // 🔄 CORRIGIDO: era "volei" agora
    },
    {
      id: 5,
      name: "New Balance 520",
      image: `${BASE_URL}/assets/img/Products/NewBalance.jpg`,
      description: "Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados",
      priceOld: 799.99,
      price: 79.99,
      filters: ["calçado", "futebol"], // ✅ Correto
    },
    {
      id: 6,
      name: "Vans Filmore",
      image: `${BASE_URL}/assets/img/Products/VansFilmore.jpg`,
      description: "Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados",
      priceOld: 799.99,
      price: 549.99,
      filters: ["calçado", "futebol"], // ✅ Correto
    },
    {
      id: 7,
      name: "Asics Gel-Cumulus 24",
      image: `${BASE_URL}/assets/img/Products/AsicsGelCumulus.avif`,
      description: "Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados",
      priceOld: 799.99,
      price: 549.99,
      filters: ["calçado", "futebol"], // ✅ Correto
    },
    {
      id: 8,
      name: "Sneaker Branco",
      image: `${BASE_URL}/assets/img/Products/SneakerBranco.jpg`,
      description: "Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados",
      priceOld: 799.99,
      price: 549.99,
      filters: ["calçado", "futebol"], // ✅ Correto
    },
  ],
  camisas: [],
  futebol: [],
  basquete: [],
  voleibol: [],
  futsal: [],
  outros: []
};
*/
  outros: []
};