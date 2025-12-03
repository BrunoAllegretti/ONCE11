import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Colecoes.css';
import { useLanguage } from '../../context/LanguageContext';
// Assumindo que as imagens estão em ../../assets/img/
import Lebron from '../../assets/img/Lebron2.png';
import PlayerBas from '../../assets/img/playerbas.png';
import playerA1 from '../../assets/img/atletaA.jpeg';
import playerA2 from '../../assets/img/AtletaA2.jpeg';
import playerV1 from '../../assets/img/volei1.jpeg';
import playerV2 from '../../assets/img/volei2.jpeg';
import playerF1 from '../../assets/img/red1.jpeg';
import playerF2 from '../../assets/img/red2.jpeg';
import playerH1 from '../../assets/img/hoquei1.jpeg';
import playerH2 from '../../assets/img/hoquei2.jpeg';

// Componente de um único slide
function SlideColecao({ data, t }: { data: any; t: (key: string) => string }) {
    return (
        <div className="slide-colecao">
            <div className="colecao-info">
                <h1 className="colecao-titulo">{t('section_collections')}</h1>
                <h2 className="colecao-subtitulo">{t(data.titleKey)}</h2>
                <p className="colecao-descricao">{t(data.descKey)}</p>
                <Link to={data.route}>
                    <button className="colecao-botao">{t('button_view')}</button>
                </Link>
            </div>
            <div className="colecao-imagens">
                <div className="imagem-container img1">
                    <img src={data.imagem1} alt={t(data.alt1Key)} />
                </div>
                <div className="imagem-container img2">
                    <img src={data.imagem2} alt={t(data.alt2Key)} />
                </div>
            </div>
        </div>
    );
}

export default function Colecoes() {
    const { t } = useLanguage();
    const colecoesData = [
        {
            id: 1,
            titleKey: 'collection_basketball_title',
            descKey: 'collection_basketball_description',
            imagem1: Lebron,
            imagem2: PlayerBas,
            alt1Key: 'alt_text_lebron',
            alt2Key: 'alt_text_basketball_player',
            className: 'slide-azul',
            route: '/collections/colecao-basquete'
        },
        {
            id: 2,
            titleKey: 'collection_athletics_title',
            descKey: 'collection_athletics_description',
            imagem1: playerA1,
            imagem2: playerA2, 
            alt1Key: 'alt_text_athletics_player',
            alt2Key: 'alt_text_athletics_player',
            className: 'slide-preto',
            route: '/collections/colecao-atletismo'
        },
        {
            id: 3,
            titleKey: 'collection_beachtennis_title',
            descKey: 'collection_beachtennis_description',
            imagem1: playerV1,
            imagem2: playerV2, 
            alt1Key: 'alt_text_beachtennis_player',
            alt2Key: 'alt_text_beachtennis_player',
            className: 'slide-roxo',
            route: '/collections/colecao-beachtennis'
        },
        {
            id: 4,
            titleKey: 'collection_football_title',
            descKey: 'collection_football_description',
            imagem1: playerF1,
            imagem2: playerF2, 
            alt1Key: 'alt_text_football_player',
            alt2Key: 'alt_text_football_player',
            className: 'slide-vermelho',
            route: '/collections/colecao-reds'
        },
        {
            id: 5,
            titleKey: 'collection_hockey_title',
            descKey: 'collection_hockey_description',
            imagem1: playerH1,
            imagem2: playerH2, 
            alt1Key: 'alt_text_hockey_player',
            alt2Key: 'alt_text_hockey_player',
            className: 'slide-branco',
            route: '/collections/colecao-hoquei'
        }
    ];

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
                    <SlideColecao key={colecao.id} data={colecao} t={t} />
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
