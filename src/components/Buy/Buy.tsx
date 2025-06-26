import React, { useState, useRef, useEffect } from 'react';
import './buy.css';
import tenisImage from '../../assets/img/tenis.webp';

const Buy = () => {
    const productImageWrapperRef = useRef<HTMLDivElement>(null);
    const magnifierLensRef = useRef<HTMLDivElement>(null);
    const productMainImageRef = useRef<HTMLImageElement>(null); 

    const zoomLevel = 2;
    const lupaSize = 100;

    useEffect(() => {
        const img = productMainImageRef.current;
        const lens = magnifierLensRef.current;

        if (img && lens) {
            const setMagnifierBackgroundSize = () => {
                lens.style.backgroundSize = `${img.offsetWidth * zoomLevel}px ${img.offsetHeight * zoomLevel}px`;
            };

            if (img.complete) {
                setMagnifierBackgroundSize();
            } else {
                img.onload = setMagnifierBackgroundSize;
            }
        }
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const lens = magnifierLensRef.current;
        const imgWrapper = productImageWrapperRef.current;
        if (!lens || !imgWrapper) return;

        const rect = imgWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const halfLupaSize = lupaSize / 2;

        lens.style.left = `${x}px`;
        lens.style.top = `${y}px`;

        const bgX = -((x * zoomLevel) - halfLupaSize);
        const bgY = -((y * zoomLevel) - halfLupaSize);
        lens.style.backgroundPosition = `${bgX}px ${bgY}px`;
    };

    const handleMouseEnter = () => {
        if (magnifierLensRef.current) {
            magnifierLensRef.current.style.display = 'block';
        }
    };

    const handleMouseLeave = () => {
        if (magnifierLensRef.current) {
            magnifierLensRef.current.style.display = 'none';
        }
    };

    return (
        <div className="buy-container">
            <div className="product-display">
                <div
                    className="product-image-wrapper"
                    ref={productImageWrapperRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img 
                        ref={productMainImageRef}
                        src={tenisImage} 
                        alt="Tênis Nike verde com detalhes em branco e preto, design esportivo e moderno, ideal para uso casual ou prática esportiva." 
                        className="product-main-image" 
                    />
                    <div
                        className="magnifier-lens"
                        ref={magnifierLensRef}
                        style={{
                            backgroundImage: `url(${tenisImage})`
                        }}
                    ></div>
                </div>
            </div>
            <div className="product-details">
                <h1>Produto 1</h1>
                <p>Tênis Nike verde com detalhes em branco e preto, design esportivo e moderno, ideal para uso casual ou prática esportiva.</p>

                <div className="price-info">
                    <span className="original-price">de 599,99</span>
                    <span className="discounted-price">por 399,99</span>
                </div>

                <button className="add-to-cart-button">Adicionar ao Carrinho</button>
            </div>
        </div>
    );
};

export default Buy;
