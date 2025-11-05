import './Collection.css';
import lebron from '../../assets/img/lebron.png'
import { Link } from 'react-router-dom';


export default function Collection() {
  return (
    <>
      <div className="containerC">
        <img src={lebron} alt="Jogador de Basquete" className="player-image" />
        <div className="content">
          <h3 className="collection-label">COLEÇÃO</h3>
          <h2 className="collection-title">Basquete</h2>
          
          
            <button className="visualize-btn">Visualizar</button>

        </div>
      </div>

    </>
  );
}
