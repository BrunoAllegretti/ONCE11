import './Banner.css'
import Tenis from '../assets/img/tenis.webp';
import Once from '../assets/img/Once11.png';

export default function Banner() {
    return (
      <div className="banner">
        <img className="tenis" src={Tenis} alt="Tênis" />
        
        <div className="lb">
          <h2>bem-vindo a</h2>
          <img className="onceB" src={Once} alt="Once11" />
        </div>
      </div>
    );
}
