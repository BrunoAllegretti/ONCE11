import './Header.css';
import { Link } from 'react-router-dom';
import CardButton from '../CartButton/CartButton'
import LogoESCR from '../../assets/img/LogoESCR.png'

export default function Header() {

  return (
    <>
      <header>
        
        <Link to="/" className="home">
          <div className="imagem-troca"></div>
        </Link>

        <img src={LogoESCR} alt="" className='logoESCR'/>
        
        <nav>
            <ul>
            <Link to="/login" className="login">
                <li>Login</li>
            </Link>

                <li>Produtos</li>
                
            <Link to="/promocional" className="promocional">
                <li>Coleções</li>
            </Link>

            <Link to="/sobrenos" className="sobrenos">
                <li>Sobre Nós</li>
            </Link>
            </ul>
        </nav>

        <Link to="/search" className="search">
            <h2>Busca</h2>
            <span className="material-symbols-outlined">search</span>
        </Link>

        <Link to="/cart" className="cart">
          <CardButton />
        </Link>
      
      </header>
    </>
  )
}