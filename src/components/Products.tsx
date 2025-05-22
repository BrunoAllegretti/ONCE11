import './Products.css'
import Card2 from '../components/Card2'
import { CardProps } from './Card2'
import run from '../assets/img/run.png'



const produtos : CardProps[] = [
  
];

export default function Products({}) {

    return (
      <>
      <img src={run} alt="" className="productImg"/>
        <div className="section-products">
              {produtosVisiveis.map((produto) => (
                  <Card2
                  key={produto.id}
                  id={produto.id}
                  name={produto.name}
                  image={produto.image}
                  description={produto.description}
                  price={produto.price}
                  />
              ))}
            
        </div>

        <div className="section-button">
          <button className="ver-mais" onClick={}></button>
        </div>
      </>
    );
}