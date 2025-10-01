import './Banner.css';
import jogador from '../../assets/img/jogador.png';
import { Link } from 'react-router-dom';
import { useEffect } from 'react'; 
import { initScrollReveal } from "../ScrollReveal/ScrollReveal";

export default function Banner() {
  useEffect(() => {
    initScrollReveal(); 
  }, []);

  return (
    <div className="banner banner-section">
      <div className="escr">
        <h2 className="banner-title reveal">Welcome to<br />ONCE 11</h2>
        
        <Link to="/login">
          <button className="banner-button reveal">Login</button>
        </Link>
      </div>
    
      <img src={jogador} alt="Jogador de Futebol" className="banner-image reveal" />
    </div>
  );
}
