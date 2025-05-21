import { useEffect, useState } from 'react';
import './Slide.css';
import slide from '../assets/img/slide.jpg';
import slide2 from '../assets/img/slide2.png';

export default function Slide() {

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
                <button className="anterior" onClick={}><span className="material-symbols-outlined">chevron_left</span></button>
                <button className="proximo" onClick={}><span className="material-symbols-outlined">chevron_right</span></button>
            </div>
        </div>
      </div>
    </section>
  );
}
