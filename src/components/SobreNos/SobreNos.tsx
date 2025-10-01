import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SobreNos.css';
import jogadorSobre from '../../assets/img/jogador.png';
import logo from '../../assets/img/logo.png';

gsap.registerPlugin(ScrollTrigger);

export default function SobreNos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sobreNosRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const cleanupAnimations = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.scrollTrigger?.kill();
      timelineRef.current.kill();
      timelineRef.current = null;
    }
  }, []);

  useEffect(() => {
    const sobreNos = sobreNosRef.current;
    if (!sobreNos) return;

    gsap.set(sobreNos, {
      y: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      zIndex: 100,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '+=1000vh',
        scrub: 1,
        invalidateOnRefresh: true,
        refreshPriority: -1,
      },
    });

    tl.to(sobreNos, { 
      y: '0vh', 
      ease: 'none',
      duration: 1
    })
    .to(sobreNos, { 
      y: '-100vh', 
      ease: 'none',
      duration: 1
    });

    timelineRef.current = tl;

    return cleanupAnimations;
  }, [cleanupAnimations]);

  useEffect(() => {
    return () => {
      cleanupAnimations();
    };
  }, [cleanupAnimations]);

  return (
    <div ref={containerRef} className="sobre-nos-wrapper">
      <div className="sobre-nos-pin-wrapper">
        <div ref={sobreNosRef} className="sobre-nos-panel">
          <div className="sobre-nos-content">
            <div className="sobre-nos-image">
              <img 
                src={jogadorSobre} 
                alt="Jogador representando a ONCE 11 - Marketplace de produtos esportivos"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="sobre-nos-text">
              <h2>Sobre a ONCE</h2>
              <p>
                Somos um <strong>marketplace de produtos esportivos</strong> que reúne variedade, qualidade e praticidade em um só lugar. Nosso propósito é conectar apaixonados por esporte a opções que unem <strong>desempenho, estilo e conforto</strong>, garantindo sempre segurança e confiança em cada compra.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

