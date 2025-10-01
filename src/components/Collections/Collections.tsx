import './Collections.css';
import Collection from './Collection'
import SecProducts from './SecProducts';




export default function Collections() {
  return (
    <>
  
        <div className="container-collections">
          <h2 className="title-colletions">Col<span>e</span>ção</h2>

            <Collection />
            <SecProducts/>
            <Collection />
            <SecProducts/>
            <Collection />

          <div className="ty">
            <h2 className='Ser'>Seremos todos<br></br> vencedores.</h2>
            <button className="visualizeButton">Visualizar</button>
          </div>
        </div>
    </>
  );
}
