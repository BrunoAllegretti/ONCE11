import React, { useState, useEffect } from 'react';
import './Colecoes.css';
// Assumindo que as imagens estão em ../../assets/img/
import Lebron from '../../assets/img/Lebron2.png';
import PlayerBas from '../../assets/img/playerbas.png';

// Estrutura de dados para a coleção
const colecoesData = [
    {
        id: 1,
        titulo: 'Coleções',
        subtitulo: 'COLEÇÃO BASQUETE',
        descricao: 'Mergulhe no mundo das enterradas usando produtos aprovados pelas maiores estrelas do esporte.',
        imagem1: Lebron,
        imagem2: PlayerBas,
        alt1: 'Lebron James',
        alt2: 'Jogador de Basquete',
        className: 'slide-azul' // Cor azul
    },
    {
        id: 2,
        titulo: 'Coleções',
        subtitulo: 'COLEÇÃO FUTEBOL',
        descricao: 'Domine o campo com chuteiras e uniformes das maiores ligas do mundo.',
        imagem1: Lebron,
        imagem2: PlayerBas, // Reutilizando imagem para exemplo
        alt1: 'Jogador de Futebol',
        alt2: 'Jogador de Basquete',
        className: 'slide-vermelho' // Cor vermelha
    },
    {
        id: 3,
        titulo: 'Coleções',
        subtitulo: 'COLEÇÃO VÔLEI',
        descricao: 'Eleve seu jogo com equipamentos de alta performance para quadra e praia.',
        imagem1: Lebron,
        imagem2: PlayerBas, // Reutilizando imagem para exemplo
        alt1: 'Jogador de Vôlei',
        alt2: 'Jogador de Basquete',
        className: 'slide-verde' // Cor verde
    }
];

// Componente de um único slide
function SlideColecao({ data }) {
    return (
        <div className="slide-colecao">
            <div className="colecao-info">
                <h1 className="colecao-titulo">{data.titulo}</h1>
                <h2 className="colecao-subtitulo">{data.subtitulo}</h2>
                <p className="colecao-descricao">{data.descricao}</p>
                <button className="colecao-botao">Vizualizar</button>
            </div>
            <div className="colecao-imagens">
                <div className="imagem-container img1">
                    <img src={data.imagem1} alt={data.alt1} />
                </div>
                <div className="imagem-container img2">
                    <img src={data.imagem2} alt={data.alt2} />
                </div>
            </div>
        </div>
    );
}

export default function Colecoes() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = colecoesData.length;

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    // Estilo dinâmico para a transição do carrossel
    const wrapperStyle = {
        transform: `translateX(-${currentSlide * 100}%)`,
    };

    // Classe dinâmica para a cor de fundo do carrossel
    const currentSlideClass = colecoesData[currentSlide].className;

    return (
        <section className={`colecoes-carrossel ${currentSlideClass}`}>
            <div className="carrossel-wrapper" style={wrapperStyle}>
                {colecoesData.map(colecao => (
                    <SlideColecao key={colecao.id} data={colecao} />
                ))}
            </div>
            {/* Botões de navegação */}
            <div className="carrossel-nav">
                <button className="nav-button prev-button" onClick={prevSlide}>{'<'}</button>
                <button className="nav-button next-button" onClick={nextSlide}>{'>'}</button>
            </div>
        </section>
    );
}
