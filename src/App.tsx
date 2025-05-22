import './App.css'
import Header from './components/Header';
import Banner from './components/Banner';
import Carousel from './components/Carousel';
import Promo from './components/PromoBanner';
import Slide from './components/Slider'
import Products2 from './components/Products2';
import Products from './components/Products';
import EightL from './components/EightLine';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />  
      <Banner />  
      <Carousel />
      <Promo />
      <Slide />
      <Products2 />
      <Products />
      <EightL />
      <Footer />
    </>
  );
}