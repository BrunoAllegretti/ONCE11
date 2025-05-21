import './App.css'
import Header from './components/Header';
import Banner from './components/Banner';
import Carousel from './components/Carousel';
import Promo from './components/PromoBanner';
import Slide from './components/Slider'

export default function App() {
  return (
    <>
      <Header />  
      <Banner />  
      <Carousel />
      <Promo />
      <Slide />
    </>
  );
}