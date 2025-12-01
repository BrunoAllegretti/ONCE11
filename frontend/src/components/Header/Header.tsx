import './Header.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { IoPeople } from "react-icons/io5";
import { HiViewGridAdd } from "react-icons/hi";

import { UserContext } from '../../context/UserContext'; 
import logo from '../../assets/img/logo.png';
import UserImg from '../../assets/img/user.webp';

export default function Header() {
  const { user, isAuthenticated, logout } = useContext(UserContext) as any;

  // Função para extrair apenas o primeiro nome
  const getFirstName = (fullName: string) => {
    if (!fullName) return 'User';
    return fullName.split(' ')[0]; // Pega apenas a primeira palavra
  };

  const defaultUserName = 'User';
	  const defaultUserImage = UserImg;
	  const imageClassName = isAuthenticated ? "user-image-header" : "";

  const nameToDisplay = isAuthenticated && user?.name 
    ? getFirstName(user.name) 
    : defaultUserName;

  const imageToDisplay = isAuthenticated && user?.profilePicture
    ? user.profilePicture
    : defaultUserImage;

  const loginLink = isAuthenticated ? "/profile" : "/login";

  return (
    <header>
      <Link to="/" className="home">
        <img src={logo} alt="logo" className='logoH'/>
      </Link>

      <nav>
        <ul>
          <Link to="/" className="gohome"><li><TiHome /> Home</li></Link>
          <Link to="/collections" className="search"><li><HiViewGridAdd /> Coleções</li></Link>
          <Link to="/search" className="search"><li><FaSearch /> Busca</li></Link>
          <Link to="/cart" className="caft"><li><FaShoppingCart /> Carrinho</li></Link>

          <Link to={loginLink} className="login">
            <li>
              {!isAuthenticated && <IoPeople />}
              {isAuthenticated ? "Perfil" : "Login"}
            </li>
          </Link>

          {/* Ícone e primeiro nome do usuário */}
          <div className="icone">
            <img src={imageToDisplay} alt={nameToDisplay} className="user-image" />
            <span className="user-name">{nameToDisplay}</span>
          </div>
        </ul>
      </nav>
    </header>
  );
}