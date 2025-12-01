import './Collections.css';
import Collection from './Collection'
import SecProducts from './SecProducts';
import { Link } from 'react-router-dom';




export default function Collections() {
  return (
    <>
  
        <div className="container-collections">
          <h2 className="title-colletions">Col<span>e</span>ção</h2>

            <Collection />
            <SecProducts/>


          <div className="ty">
            <h2 className='Ser'>Seremos todos<br></br> vencedores.</h2>
            
          <Link to="/campanha" className="campanha">
            <button className="visualizeButton">Visualizar</button>
          </Link>
          </div>
        </div>
    </>
  );
}
