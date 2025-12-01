import './Header.css';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { IoPeople } from "react-icons/io5";
import { HiViewGridAdd } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

import { UserContext } from '../../context/UserContext'; 
import logo from '../../assets/img/logo.png';
import UserImg from '../../assets/img/user.webp';

export default function Header() {
  const { user, isAuthenticated, logout } = useContext(UserContext) as any;
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  const getFirstName = (fullName: string) => {
    if (!fullName) return 'User';
    return fullName.split(' ')[0];
  };

  const defaultUserName = 'User';
  const defaultUserImage = UserImg;

  const nameToDisplay = isAuthenticated && user?.name 
    ? getFirstName(user.name) 
    : defaultUserName;

  const imageToDisplay = isAuthenticated && user?.profilePicture
    ? user.profilePicture
    : defaultUserImage;

  const loginLink = isAuthenticated ? "/profile" : "/login";

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header>
      <Link to="/" className="home" onClick={closeMenu}>
        <img src={logo} alt="logo" className='logoH'/>
      </Link>

      {/* Language toggle button */}
      <button className="lang-toggle" onClick={toggleLang} aria-label="Toggle language">
        {lang === 'pt' ? 'EN' : 'PT'}
      </button>

      {/* Botão Hamburger - Visível em mobile e tablet */}
      <button className="hamburger-btn" onClick={toggleMenu} aria-label="Menu">
        {menuOpen ? <AiOutlineClose size={24} /> : <GiHamburgerMenu size={24} />}
      </button>

      <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
        <ul>
          <Link to="/" className="gohome" onClick={closeMenu}>
            <li><TiHome /> {t('home')}</li>
          </Link>
          <Link to="/collections" className="search" onClick={closeMenu}>
            <li><HiViewGridAdd /> {t('collections')}</li>
          </Link>
          <Link to="/search" className="search" onClick={closeMenu}>
            <li><FaSearch /> {t('search')}</li>
          </Link>
          <Link to="/cart" className="caft" onClick={closeMenu}>
            <li><FaShoppingCart /> {t('cart')}</li>
          </Link>

          <Link to={loginLink} className="login" onClick={closeMenu}>
            <li>
              {!isAuthenticated && <IoPeople />}
              {isAuthenticated ? t('profile') : t('login')}
            </li>
          </Link>

          {/* Ícone e primeiro nome do usuário */}
          <div className="icone" onClick={closeMenu}>
            <img src={imageToDisplay} alt={nameToDisplay} className="user-image" />
            <span className="user-name">{nameToDisplay}</span>
          </div>
        </ul>
      </nav>
    </header>
  );
}