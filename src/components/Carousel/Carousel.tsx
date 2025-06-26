import './Carousel.css'
import { useRef } from 'react';
import Card from '../SecProducts2/Card';
import Logo from '../../assets/img/logo_sem_fundo.png';
import { produto } from '../Products'; 

export default function Carousel() {
    
    const containerRef = useRef<HTMLDivElement>(null);
    let isDown = false; 

    let startX = 0;
    let scrollLeft = 0;

    const ButtonPressed  = (e: React.MouseEvent) => {
        const container = containerRef.current!;
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    };

    const handleMouseLeaveOrUp = () => {
        isDown = false;
    };
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const container = containerRef.current!;
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1;
        container.scrollLeft = scrollLeft - walk;
    };

    const produtos = produto.maisComprados; 

    return (
        <div className="containerC" id="cards"
            ref={containerRef}
            onMouseDown={ButtonPressed}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
        >
            <img src={Logo} alt="" className="logoOnce" />
            <h2 className="title-carousel">TOP VENDAS<br /></h2>
            {produtos.map((produto) => (
                <Card
                    key={produto.id}
                    id={produto.id}
                    name={produto.name}
                    image={produto.image}
                    description={produto.description}
                    priceOld={produto.priceOld}
                    price={produto.price}
                />
            ))}
        </div>
    );
}
