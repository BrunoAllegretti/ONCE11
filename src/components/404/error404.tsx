import './404.css';
import cesta from '../../assets/img/cesta.jpg';
import bola from '../../assets/img/Bola.gif';

export default function Error404(){

    return (
        <section className='error'>
            <div className='errorText'>
                <h1 className='h404'>4
                <img src={bola} alt="Bola de basquete" className='bola404' />
                4</h1>
                <h2 className='desc404'>404 - Página Fora de Jogo</h2><hr className='hr404'/>
            </div>

            <div className='errorImg'>
                <img src={cesta} alt="" />
            </div>
        </section>
    )
}