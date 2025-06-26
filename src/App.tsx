import './App.css'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// 2 - Reaproveitamento de Estrutura 
import { Outlet } from 'react-router-dom';


export default function App() {
  return (
    <>
      <Header />  
      <Outlet />
      <Footer />
    </>
  );
}