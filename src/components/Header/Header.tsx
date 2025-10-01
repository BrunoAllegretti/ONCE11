import './Header.css';
import { Link } from 'react-router-dom';
// import CardButton from '../CartButton/CartButton'
import logo from '../../assets/img/logo.png'

export default function Header() {

  return (
    <>
      <header>

        <Link to="/" className="home">
          <img src={logo} alt="" className='logoH'/>
        </Link>  
        
        
        <nav>
            <ul>  
            <Link to="/" className="gohome">
              <li>Home</li>
            </Link>   

            <a href="#colecoes" className="promocional" onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('colecoes');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
                <li>Coleções</li>
            </a>

            
            <Link to="/search" className="search">
                <li>Busca</li>
            </Link>

            <Link to="/cart" className="caft">
                <li>Carrinho</li>
            </Link>

            <Link to="/login" className="login">
                <li>Login</li>
            </Link>
            </ul>
        </nav>
      
      </header>
    </>
  )
}