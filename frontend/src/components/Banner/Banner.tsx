import './Banner.css';
import jogador from '../../assets/img/jogador.png';
import { Link } from 'react-router-dom';
import { useEffect } from 'react'; 
import { initScrollReveal } from "../ScrollReveal/ScrollReveal";
import { useLanguage } from '../../context/LanguageContext';

export default function Banner() {
  const { t } = useLanguage();

  useEffect(() => {
    initScrollReveal(); 
  }, []);

  return (
    <div className="banner banner-section">
      <div className="escr">
        <h2 className="banner-title reveal">{t('heading_welcome_to')}<br />{t('heading_once_11')}</h2>
        
        <Link to="/login">
          <button className="banner-button reveal">{t('button_login')}</button>
        </Link>
      </div>
    
      <img src={jogador} alt={t('alt_text_football_player_banner')} className="banner-image reveal" />
    </div>
  );
}
