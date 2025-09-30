import Banner from './Banner/Banner';
import SobreNos from './SobreNos/SobreNos';
import Promo from './Collections/PromoBanner';
import Products from './SecProducts1/Products2';
import Slide from './Slide/Slide';
import Products2 from './SecProducts2/Product';
import EightL from './Collections/EightLine';


export default function Home() {
  return (
    <>
      <Banner /> 
      <SobreNos /> 
      <Promo />
      <Slide />
      <Products />
      <Products2 />
      <EightL />
    </>
  );
}