import './Header.css';
import { Link, useLocation } from 'react-router-dom';
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
  const [imageError, setImageError] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
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

  const imageToDisplay = isAuthenticated && user?.profilePicture && !imageError
    ? user.profilePicture
    : defaultUserImage;

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);
  const closeUserMenu = () => setUserMenuOpen(false);

  const handleImageError = () => setImageError(true);
  
  const handleLogout = () => {
    logout();
    closeUserMenu();
    closeMenu();
  };

  // Detecta tela menor ou igual a 800px para decidir a ordem dos itens do menu
  const isMobileMenu = window.innerWidth <= 800;

  // Carrinho redireciona para login se não autenticado
  // (Se preferir um evento JS, pode usar navigate do react-router, aqui é por <Link>)
  const cartLink = isAuthenticated ? "/cart" : "/login";

  return (
    <header>
      {/* Logo/Home principal */}
      <Link to="/" className="home" onClick={closeMenu}>
        <img src={logo} alt="logo" className='logoH'/>
      </Link>

      {/* Botão de linguagem visível sempre (fora do menu lateral) em desktop */}
      {!isMobileMenu && (
        <button className="lang-toggle" onClick={toggleLang} aria-label="Toggle language">
          {lang === 'pt' ? 'EN' : 'PT'}
        </button>
      )}

      {/* Botão Hamburger para mobile/tablet */}
      <button
        className="hamburger-btn"
        onClick={toggleMenu}
        aria-label="Menu"
      >
        {menuOpen ? <AiOutlineClose size={24} /> : <GiHamburgerMenu size={24} />}
      </button>

      {/* NAVBAR - lateral em mobile/hamburger  */}
      <nav className={`navbar${menuOpen ? ' active' : ''}`}>
        {isMobileMenu && (
          <>
            <span className="close-btn" onClick={closeMenu}>
              <AiOutlineClose size={26} />
            </span>
            <div className="icone" onClick={toggleUserMenu}>
              <img 
                src={imageToDisplay} 
                alt={nameToDisplay} 
                className="user-image"
                onError={handleImageError}
              />
              <span className="user-name">{nameToDisplay}</span>
              {isAuthenticated && userMenuOpen && (
                <div className="user-dropdown">
                  <button onClick={handleLogout} className="logout-btn">
                    {t('logout')}
                  </button>
                </div>
              )}
            </div>
            <button className="lang-toggle" onClick={toggleLang} aria-label="Toggle language" style={{marginLeft: 0}}>
              {lang === 'pt' ? 'EN' : 'PT'}
            </button>
          </>
        )}
        <ul>
          <Link to="/" className="gohome" onClick={closeMenu}><li><TiHome /> {t('home')}</li></Link>
          <Link to="/collections" className="search" onClick={closeMenu}><li><HiViewGridAdd /> {t('collections')}</li></Link>
          <Link to="/search" className="search" onClick={closeMenu}><li><FaSearch /> {t('search')}</li></Link>
          <Link to={cartLink} className="caft" onClick={closeMenu}><li><FaShoppingCart /> {t('cart')}</li></Link>
          <Link to="/login" className="login" onClick={closeMenu}>
            <li>
              <IoPeople /> {t('login')}
            </li>
          </Link>
          {/* Em desktop, o user fica sempre ali, fora do menu*/}
          {!isMobileMenu && (
            <div className="icone user-menu-wrapper" onClick={toggleUserMenu}>
              <img 
                src={imageToDisplay} 
                alt={nameToDisplay}
                className="user-image"
                onError={handleImageError}
              />
              <span className="user-name">{nameToDisplay}</span>
              {isAuthenticated && userMenuOpen && (
                <div className="user-dropdown">
                  <button onClick={handleLogout} className="logout-btn">
                    {t('logout')}
                  </button>
                </div>
              )}
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
}