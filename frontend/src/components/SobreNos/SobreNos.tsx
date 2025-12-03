import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SobreNos.css';
import jogadorSobre from '../../assets/img/jogador.png';
import { useLanguage } from '../../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function SobreNos() {
  const { t } = useLanguage();
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

    // estado inicial
    gsap.set(sobreNos, {
      y: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      zIndex: 100,
      borderRadius: '5%',
    });

    // timeline de scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '+=1500vh',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // no centro: sem bordas arredondadas
          if (progress > 0.25 && progress < 0.75) {
            gsap.to(sobreNos, {
              borderRadius: '0%',
              duration: 0.3,
              ease: 'power2.out',
            });
          } else {
            // quando começa ou termina o movimento: volta as bordas
            gsap.to(sobreNos, {
              borderRadius: '5%',
              duration: 0.3,
              ease: 'power2.out',
            });
          }
        },
      },
    });

    tl.to(sobreNos, { y: '0vh', ease: 'none', duration: 1 })
      .to(sobreNos, { y: '-100vh', ease: 'none', duration: 1 });

    timelineRef.current = tl;

    return cleanupAnimations;
  }, [cleanupAnimations]);

  useEffect(() => cleanupAnimations, [cleanupAnimations]);

  return (
    <div ref={containerRef} className="sobre-nos-wrapper">
      <div className="sobre-nos-pin-wrapper">
        <div ref={sobreNosRef} className="sobre-nos-panel">
          <div className="sobre-nos-content">
            <div className="sobre-nos-image">
              <img
                src={jogadorSobre}
                alt={t('alt_text_about_player')}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="sobre-nos-text">
              <h2>{t('heading_about_once')}</h2>
              <p>
                {t('paragraph_about_once_description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}