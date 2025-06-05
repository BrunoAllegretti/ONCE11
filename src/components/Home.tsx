import Banner from '../components/Banner';
import Carousel from '../components/Carousel';
import Promo from '../components/PromoBanner';
import Products from '../components/Products';
import Slide from '../components/Slide';
import Products2 from '../components/Products2';
import EightL from '../components/EightLine';


export default function Home() {
  return (
    <>
      <Banner /> 
      <Carousel /> 
      <Promo />
      <Slide />
      <h2 className="aviso">Aviso o Seletor de Esporte será feito na Sprint 4</h2>
      <Products2 />
      <Products />
      <EightL />
    </>
  );
}