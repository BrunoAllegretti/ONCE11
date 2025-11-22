import './Header.css';
import { Link } from 'react-router-dom';

// REACT ICONS
import { FaSearch } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { FaShoppingCart } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { HiViewGridAdd } from "react-icons/hi";


// IMG 
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
              <li><TiHome /> Home</li>
            </Link>   

            <Link to="/collections" className="search">
                <li><HiViewGridAdd />Coleções</li>
            </Link>

            
            <Link to="/search" className="search">
                <li><FaSearch />Busca</li>
            </Link>

            <Link to="/cart" className="caft">
                <li><FaShoppingCart />Carrinho</li>
            </Link>

            <Link to="/login" className="login">
                <li><IoPeople />Login</li>
            </Link>
            </ul>
        </nav>
    
      </header>
    </>
  )
}