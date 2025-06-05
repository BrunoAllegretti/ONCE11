import './Header.css';
import Logo from '../assets/img/Logo.png';
import { Link } from 'react-router-dom';

export default function Header() {

  return (
    <>
      <header>
        <img src={Logo} alt="" className="logoH" />
        <nav>
            <ul>
                <li>Entrar</li>
                <li>Produtos</li>
                <li>Promoções</li>
                <li>Sobre Nós</li>
            </ul>
        </nav>

        <div className='search'>
            <h2>Busca</h2>
            <span className="material-symbols-outlined">search</span>
        </div>

        <Link to="/cart" className="cart">
          <span className="material-symbols-outlined">shopping_cart</span>
        </Link>
      </header>
    </>
  )
}