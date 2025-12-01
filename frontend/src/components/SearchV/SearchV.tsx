import { useState, useEffect } from "react";
import "./SearchV.css";

type Slide = {
  title: string;
  centerText: string;
  image: string;
};

const slides: Slide[] = [
  {
    title: "Roupas",
    centerText: "Creative Elements",
    image: "https://assets.codepen.io/7558/flame-glow-blur-001.jpg",
  },
  {
    title: "Calçados",
    centerText: "Inner Stillness",
    image: "https://assets.codepen.io/7558/flame-glow-blur-002.jpg",
  },
  {
    title: "Bolas",
    centerText: "Deep Knowing",
    image: "https://assets.codepen.io/7558/flame-glow-blur-003.jpg",
  },
  {
    title: "Acessórios",
    centerText: "True Expression",
    image: "https://assets.codepen.io/7558/flame-glow-blur-004.jpg",
  },
  {
    title: "Equipamentos",
    centerText: "Now Moment",
    image: "https://assets.codepen.io/7558/flame-glow-blur-005.jpg",
  },
  {
    title: "Colecionáveis",
    centerText: "Deep Attention",
    image: "https://assets.codepen.io/7558/flame-glow-blur-006.jpg",
  },
];

export default function SearchV() {
  const [section, setSection] = useState(0);

  const changeSection = (index: number) => {
    if (index >= 0 && index < slides.length) setSection(index);
  };

  useEffect(() => {
    const onScroll = () => {
      const index = Math.round(window.scrollY / window.innerHeight);
      changeSection(index);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const total = slides.length;
  const current = section + 1;

  return (
    <div className="sv-scroll-container">
      <div
        className="sv-background"
        style={{ backgroundImage: `url(${slides[section].image})` }}
      />

      <div className="sv-fixed-section">
        <div className="sv-grid">
          <div className="sv-content">

            {/* LEFT COLUMN */}
            <div className="sv-left">
              {slides.map((s, i) => (
                <div
                  key={i}
                  className={`sv-artist ${i === section ? "sv-active" : ""}`}
                >
                  {s.title}
                </div>
              ))}
            </div>

            {/* CENTER TEXT */}
            <div className="sv-featured">
              <h3 className="sv-center-text">
                {slides[section].centerText}
              </h3>
            </div>

            {/* RIGHT COLUMN */}
            <div className="sv-right">
              {slides.map((s, i) => (
                <div
                  key={i}
                  className={`sv-category ${i === section ? "sv-active" : ""}`}
                >
                  {s.title}
                </div>
              ))}
            </div>

          </div>

          {/* FOOTER */}
          <div className="sv-footer">
            <div className="sv-progress">
              <span>{String(current).padStart(2, "0")}</span>
              <span>{String(total).padStart(2, "0")}</span>
              <div
                className="sv-progress-fill"
                style={{ width: `${(current / total) * 100}%` }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
