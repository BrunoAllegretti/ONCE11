import { useEffect, useState } from 'react';
import './Slide.css';
import slide1 from '../../assets/img/slide1.png'; // Certifique-se de que este caminho está correto
import slide2 from '../../assets/img/slide2.png';
import slide3 from '../../assets/img/slide3.png';
import slide4 from '../../assets/img/slide4.png';
import slide5 from '../../assets/img/slide5.png';

export default function Slide() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slides = [
    slide1, // Adicionado slide1 para ter 5 slides
    slide2,
    slide3,
    slide4,
    slide5,
  ];

  const totalSlides = slides.length; // Agora será 5

  const goToNextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const goToPrevSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const handleRadioChange = (index) => {
    setCurrentSlideIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  // Calcula o valor do transform com base no slide atual
  const transformValue = `translateX(-${currentSlideIndex * (100 / totalSlides)}%)`;

  return (
    <section className="section-slide">
      <div className="slider">
        <div className="slides" style={{ transform: transformValue }}>
          {slides.map((imageSrc, index) => (
            <div className="slide" key={index}>
              <img src={imageSrc} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* Navegação manual (botões) */}
        <div className="manual-navigation">
          <button className="anterior" onClick={goToPrevSlide}>
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="proximo" onClick={goToNextSlide}>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        {/* Pontos de navegação */}
        <div className="navigation-dots">
          {slides.map((_, index) => (
            <label
              key={`dot-${index}`}
              className={`dot ${currentSlideIndex === index ? 'active' : ''}`}
              onClick={() => handleRadioChange(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
