import './Banner.css';
import Once from '../../assets/img/Once11.png';
import Fundo from '../../assets/img/nossosProdutos.png';

export default function Banner() {
  return (
    <div className="banner">
      <div className="tenis-3d-container">
        {/* Imagem de fundo */}
        <div className="background-image">
          <img src={Fundo} alt="Background" className="fundo" />
        </div>

        {/* Espaço vazio no lugar do Canvas 3D */}
        <div className="canvas-container" style={{ width: '100%', height: '100%' }}>
          {/* Aqui você pode colocar uma imagem estática ou deixar vazio */}
        </div>
      </div>

      <div className="lb">
        <h2>Bem-vindo a</h2>
        <img className="onceB" src={Once} alt="Once11" />
      </div>
    </div>
  );
}
