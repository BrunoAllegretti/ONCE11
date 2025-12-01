import { useEffect, useState } from 'react';
import './Slide.css';
import tenis from '../../assets/img/tenisdourado.png';
import { useLanguage } from '../../context/LanguageContext';

export default function Slide() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();
  const totalSlides = 3; // Total de slides (repetidos)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="slide-container">
      <div
        className="slide-content"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {[...Array(totalSlides)].map((_, index) => (
          <div className="slide-item" key={index}>
            <div className="slide-text-section">
              <h2>{t('featured')}</h2>
              <h3>{t('product_name')}</h3>
              <p>
                {t('nike_max_jewell')}<br></br>
                R$ 599,50
              </p>
              <button className="slide-button">{t('button_buy_slide')}</button>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <hr />
            </div>
            <div className="blue"></div>
            <div className="slide-image-section">
              <img src={tenis} alt="Tênis Dourado" />
            </div>
          </div>
        ))}
      </div>

      <div className="slide-nav-buttons">
        <button
          className="slide-nav-button prev-button"
          onClick={prevSlide}
          disabled={currentSlide === 0}
        >
          &#10094;
        </button>
        <button
          className="slide-nav-button next-button"
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}

