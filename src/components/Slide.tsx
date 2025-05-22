import { useEffect, useState } from 'react';
import './Slide.css';
import slide from '../assets/img/slide.jpg';
import slide2 from '../assets/img/slide2.png';

export default function Slide() {

  const [count, setCount] = useState(1);

  function Proximo() {
    setCount(prev => {
      const next = prev + 1 > 4 ? 1 : prev + 1;

      const nextRadio = document.getElementById("radio" + next) as HTMLInputElement;
      if (nextRadio) nextRadio.checked = true;

      return next;
    });  
  }

  function Anterior() {
    setCount(prev => {
      const next = prev - 1 < 1 ? 4 : prev - 1;

      const nextRadio = document.getElementById("radio" + next) as HTMLInputElement;
      if (nextRadio) nextRadio.checked = true;

      return next;
    });  
  }

  
  useEffect(() => {
    const firstRadio = document.getElementById("radio1") as HTMLInputElement;

    if(firstRadio) firstRadio.checked = true;

    const interval = setInterval(() => { 

      setCount(prev => {
        const next = prev + 1 > 4 ? 1 : prev + 1;

        const nextRadio = document.getElementById("radio" + next) as HTMLInputElement;
        if (nextRadio) nextRadio.checked = true;

        return next;
      });   
    }, 5000);
    return () => clearInterval(interval); // limpa intervalo ao desmontar
  }, []);

  return (
    <section className="section-slide">
      <div className="slider">
        <div className="slides">
          <input type="radio" name="radio-btn" id="radio1" />
          <input type="radio" name="radio-btn" id="radio2" />
          <input type="radio" name="radio-btn" id="radio3" />
          <input type="radio" name="radio-btn" id="radio4" />

          <div className="slide first">
            <img src={slide} alt="" />
          </div>
          <div className="slide">
            <img src={slide2} alt="" />
          </div>
          <div className="slide">
            <img src={slide} alt="" />
          </div>
          <div className="slide">
            <img src={slide2} alt="" />
          </div>

            <div className="manual-navigation">
                <button className="anterior" onClick={Anterior}><span className="material-symbols-outlined">chevron_left</span></button>
                <button className="proximo" onClick={Proximo}><span className="material-symbols-outlined">chevron_right</span></button>
            </div>
        </div>
      </div>
    </section>
  );
}
