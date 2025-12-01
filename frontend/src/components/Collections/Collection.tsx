import { useEffect, useRef } from "react";
import "./Collection.css";
import lebron from "../../assets/img/lebron.png";
import run from "../../assets/img/RUN.jpeg";
import tennis from "../../assets/img/BeachTennis.jpeg";
import hoquei from "../../assets/img/hoquei.jpeg";
import red from "../../assets/img/red.jpeg";


import { gsap } from "gsap";

export default function Collection() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const slides = [lebron, run, tennis, hoquei, red];

  useEffect(() => {
    const slider = sliderRef.current;
    const sliderContainer = containerRef.current;
    if (!slider || !sliderContainer) return;

    let tickerFn: any;

    function initSlider() {
      const originalItems = Array.from(slider.children) as HTMLElement[];

      slider.innerHTML = "";
      originalItems.forEach(item => slider.appendChild(item));

      const itemStyle = getComputedStyle(originalItems[0]);
      const itemWidth =
        originalItems[0].offsetWidth + parseFloat(itemStyle.marginRight);

      const fullSetWidth = originalItems.length * itemWidth;

      const cloneCount = 4;
      for (let i = 0; i < cloneCount; i++) {
        originalItems.forEach((item) => {
          const clone = item.cloneNode(true) as HTMLElement;
          slider.appendChild(clone);
        });
      }

      const setX = gsap.quickSetter(slider, "x", "px");

      let target = 0;
      let current = 0;

      const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

      const sensitivity = 1;
      const easeFactor = 0.05;
      const autoScrollSpeed = 2.5;

      let lastInteractionTime = Date.now();

      const wheelHandler = (e: WheelEvent) => {
        e.preventDefault();
        e.stopPropagation();
        target += e.deltaY * sensitivity;
        lastInteractionTime = Date.now();
      };

      sliderContainer.addEventListener("wheel", wheelHandler, { passive: false });

      if (tickerFn) gsap.ticker.remove(tickerFn);

      tickerFn = () => {
        if (Date.now() - lastInteractionTime > 1500) {
          target += autoScrollSpeed;
        }

        current = lerp(current, target, easeFactor);

        let mod = current % fullSetWidth;
        if (mod < 0) mod += fullSetWidth;

        setX(-mod);
      };

      gsap.ticker.add(tickerFn);

      const sliderItems = slider.querySelectorAll(".clc-slider-item");
      let scrollTimeout: any;

      const scaleHandler = () => {
        gsap.to(sliderItems, { scale: 0.7, duration: 0.8, ease: "power2.out" });

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          gsap.to(sliderItems, { scale: 1, duration: 0.8, ease: "power2.out" });
        }, 150);
      };

      sliderContainer.addEventListener("wheel", scaleHandler, { passive: true });

      return () => {
        sliderContainer.removeEventListener("wheel", wheelHandler);
        sliderContainer.removeEventListener("wheel", scaleHandler);
        gsap.ticker.remove(tickerFn);
      };
    }

    const cleanup = initSlider();
    return cleanup;
  }, []);

  return (
    <>
      <div className="clc-container">
        <div className="clc-slider-wrapper-outer" ref={containerRef}>
          <div className="clc-slider-wrapper-inner">
            <div className="clc-slider" ref={sliderRef}>

              {slides.map((img, index) => (
                <div className="clc-slide-wrapper" key={index}>
                  <div className="clc-slider-item">
                    <img src={img} alt={`slide-${index}`} />
                    <div className="clc-bubble">
                      <span>Visualizar</span>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
