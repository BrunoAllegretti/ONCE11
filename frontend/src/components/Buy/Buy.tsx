import React, { useState, useRef, useEffect } from 'react';
import './buy.css';
import tenisImage from '../../assets/img/tenis.webp';
import { useLanguage } from '../../context/LanguageContext';

// Definição de dados mockados para simular a seleção de opções
const sizes = [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47];
const colors = [
    { name: 'Vermelho', hex: '#FF0000' },
    { name: 'Azul', hex: '#0000FF' },
    { name: 'Preto', hex: '#000000' },
    { name: 'Roxo', hex: '#8A2BE2' },
    { name: 'Verde Limão', hex: '#7FFF00' },
    { name: 'Ciano', hex: '#00FFFF' },
];
const types = ['Society', 'Campo', 'Quadra'];

const Buy = () => {
    const { t } = useLanguage();
    const productImageWrapperRef = useRef<HTMLDivElement>(null);
    const magnifierLensRef = useRef<HTMLDivElement>(null);
    const productMainImageRef = useRef<HTMLImageElement>(null); 

    const zoomLevel = 2;
    const lupaSize = 120; // Ajustado para o novo tamanho da lupa no CSS

    const [selectedSize, setSelectedSize] = useState(42);
    const [selectedColor, setSelectedColor] = useState(colors[0].name);
    const [selectedType, setSelectedType] = useState(types[1]);

    useEffect(() => {
        const img = productMainImageRef.current;
        const lens = magnifierLensRef.current;

        if (img && lens) {
            const setMagnifierBackgroundSize = () => {
                lens.style.backgroundSize = `${img.offsetWidth * zoomLevel}px ${img.offsetHeight * zoomLevel}px`;
            };
            
            // Garante que o background-size seja definido após o carregamento da imagem
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

        // Posição da lupa (centralizada no cursor)
        lens.style.left = `${x}px`;
        lens.style.top = `${y}px`;

        // Posição do background (imagem ampliada)
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
                <h2 className="product-category">{t('label_product_category')}</h2>
                <h1 className="product-title">{t('label_product_title')}</h1>
                <p className="product-description">{t('alt_text_product_shoe')}</p>

                {/* Seção de Opções */}
                <div className="options-section">
                    {/* Opções de Tamanho */}
                    <div className="option-group">
                        <span className="option-label">{t('label_size')}</span>
                        <div className="option-buttons">
                            {sizes.map(size => (
                                <button
                                    key={size}
                                    className={`option-button ${selectedSize === size ? 'selected' : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Opções de Tipo (Society, Campo, Quadra) */}
                    <div className="option-group">
                        <span className="option-label">{t('label_type')}</span>
                        <div className="option-buttons">
                            {types.map(type => (
                                <button
                                    key={type}
                                    className={`option-button ${selectedType === type ? 'selected' : ''}`}
                                    onClick={() => setSelectedType(type)}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Opções de Cor */}
                    <div className="option-group">
                        <span className="option-label">{t('label_color')}</span>
                        <div className="option-colors">
                            {colors.map(color => (
                                <button
                                    key={color.name}
                                    className={`color-option ${selectedColor === color.name ? 'selected' : ''}`}
                                    style={{ backgroundColor: color.hex }}
                                    onClick={() => setSelectedColor(color.name)}
                                    title={color.name}
                                >
                                    {/* Adiciona um indicador de seleção para cores claras */}
                                    {selectedColor === color.name && <span className="color-check">✓</span>}
                                </button>
                            ))}
                        </div>
                        <span className="selected-color-name">{selectedColor}</span>
                    </div>
                </div>

                {/* Seção de Preço */}
                <div className="price-section">
                    <span className="price-label">{t('label_price')}</span>
                    <h3 className='product-price'>R$ 179,98</h3>
                </div>

                {/* Grupo de Botões de Ação */}
                <div className="button-group">
                    <button className="action-button add-to-cart-button">{t('button_add_to_cart')}</button>
                    <button className="action-button buy-now-button">{t('button_buy_now')}</button>
                </div>
            </div>
        </div>
    );
};

export default Buy;
