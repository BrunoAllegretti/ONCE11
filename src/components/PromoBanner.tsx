import './PromoBanner.css'
import Camisas from '../assets/img/CamisasBr.png'

export default function Promo() {

  return (
    <>
        <section className='section-promo'>
            <div className="promo">
                <div className="info">
                    <h2 className="title-promo">50% off</h2>
                    <p className="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque facilisis aliquam sem, eget vehicula augue porta a. Quisque eros augue, placerat sed tortor quis, luctus sollicitudin orci. Nullam sagittis fringilla felis sed ornare. Sed faucibus dolor</p>
                      <div className="colec">
                        <p className="colecao">Ver outras<br></br> <span>Coleções</span></p>
                        <p className="colecao1">Visite a Coleção<br></br>
                          <span className="b">B</span>
                          <span className="r">R</span>
                          <span className="a">A</span>
                          <span className="z">Z</span>
                          <span className="a">U</span>
                          <span className="r">C</span>
                          <span className="b">A</span>
                        </p>   
                    </div>
                </div>
                <img className="Camisa" src={Camisas} alt="Camisas do Brasil Azul e Amarela" />
            </div>

            <div className="promo-red">

            </div>
        </section>
    </>
  )
}