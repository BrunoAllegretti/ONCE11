import './Header.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

// REACT ICONS
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { IoPeople } from "react-icons/io5";
import { HiViewGridAdd } from "react-icons/hi";

// CONTEXT
import AppContext from '../../context/AppContext';

// IMG
import logo from '../../assets/img/logo.png';

export default function Header() {
  const { user } = useContext(AppContext); 
  // user = { name: "Bruno", photo: "link da foto" }

  return (
    <header>
      <Link to="/" className="home">
        <img src={logo} alt="logo" className='logoH'/>
      </Link>  

      <nav>
        <ul>  
          <Link to="/" className="gohome">
            <li><TiHome /> Home</li>
          </Link>   

          <Link to="/collections" className="search">
            <li><HiViewGridAdd /> Coleções</li>
          </Link>

          <Link to="/search" className="search">
            <li><FaSearch /> Busca</li>
          </Link>

          <Link to="/cart" className="caft">
            <li><FaShoppingCart /> Carrinho</li>
          </Link>

          {user ? (
            // SE ESTIVER LOGADO → foto + nome
            <Link to="/profile" className="profile">
              <li className="profileBox">
                <img src={user.photo} className="profileImg" alt="foto"/>
                <span>{user.name}</span>
              </li>
            </Link>
          ) : (
            // SE NÃO ESTIVER LOGADO → botão login normal
            <Link to="/login" className="login">
              <li><IoPeople /> Login</li>
            </Link>
          )}

        </ul>
      </nav>
    </header>
  );
}
