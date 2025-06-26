import './Promocional.css';
import lebron from '../../assets/img/lebron.png';
import camisa from '../../assets/img/brazuca.png'; // Assumindo que brazuca.png é a imagem da camisa
import EightL2 from './EightLine2';

export default function Promocional() {
    return (
        <section className='promocional-section'>
            {/* Bloco Promocional da Camisa Brazuca */}
            <div className="promo-block brazuca-promo">
                <div className="brazuca-content">
                    <img src={camisa} alt="Camisa Brazuca" className="promo-image" />
                    <p id="colecao1">
                          <span id="b">B</span>
                          <span id="r">R</span>
                          <span id="a">A</span>
                          <span id="z">Z</span>
                          <span id="a">U</span>
                          <span id="r">C</span>
                          <span id="b">A</span>
                        </p>
                    <button className="promo-button brazuca-button">Conferir Produtos</button>
                </div>
            </div>

            {/* Bloco Promocional do LeBron James */}
            <div className="promo-block lebron-promo">
                <div className="lebron-content">
                    <img src={lebron} alt="LeBron James" className="promo-image lebron-image" />
                    <button className="promo-button lebron-button">Conferir Produtos</button>
                </div>
            </div>

            <EightL2 />
        </section>
    );
}
