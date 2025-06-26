import { BsPersonFill } from "react-icons/bs";
import { useState, useEffect } from 'react';
import img1 from '../../assets/img/img1.png'
import img2 from '../../assets/img/img2.png'
import img3 from '../../assets/img/img3.png'
import './Login.css'

export function Login() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: img1,
            title: "ONCE",
            description: "ONCE é energia que te move dentro e fora das quadras."
        },
        {
            image: img2,
            title: "ONCE",
            description: "O esporte te impulsiona no jogo, na rua e na vida."
        },
        {
            image: img3,
            title: "ONCE",
            description: "Não é só sobre vencer. É sobre se mover."
        }
    ];

    const changeSlide = (slideIndex) => {
        setCurrentSlide(slideIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="login-container">
            <div className="left-column">
                <div className="product-showcase" key={currentSlide}>
                    <div className="product-image">
                        <img src={slides[currentSlide].image} alt="Nike Shoe" />
                    </div>
                    <div className="product-info">
                        <h2>{slides[currentSlide].title}</h2>
                        <p>{slides[currentSlide].description}</p>
                    </div>
                    <div className="pagination-dots">
                        {slides.map((_, index) => (
                            <label
                                key={index}
                                className={`dot ${currentSlide === index ? 'active' : ''}`}
                                onClick={() => changeSlide(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="right-column">
                <div className="login-form">
                    <h1 className="login-title">Sign in to ONCE 11</h1>

                    <div className="user-icon">
                        <div className="icon-circle">
                            <BsPersonFill className='icon-login'/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="login">login</label>
                        <input
                            type="text"
                            id="login"
                            name="login"
                            className="login-input"
                        />
                    </div>

                    <div className="form-actions">
                        <a href="#" className="no-account-link">Não tenho conta</a>
                        <button type="submit" className="login-button">ENTRAR</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
