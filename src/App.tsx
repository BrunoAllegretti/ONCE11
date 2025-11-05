import './App.css'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ScrollToStop from './components/ScrollToTop/ScrollToTop';


// 2 - Reaproveitamento de Estrutura 
import { Outlet } from 'react-router-dom';


export default function App() {
  return (
    <>
      <Header />  
      <ScrollToStop/>
      <Outlet />
      <Footer />
    </>
  );
}