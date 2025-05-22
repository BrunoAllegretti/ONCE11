import './Carousel.css'
import { useRef } from 'react';
import Card from '../components/Card';
import Logo from '../assets/img/Logo.png';

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

    // Array de dados para os cards
    const produtos = [
        { id: 1, name: 'Olympikus Venum', image: 'https://vulcabras.vtexassets.com/arquivos/ids/288274-800-800?v=638464727200130000&width=800&height=800&aspect=true', description: 'Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados', priceOld: 799.99, price: 549.99 },
        { id: 2, name: 'Nike LeBron Witness 8', image: 'https://lojaseralle.vtexassets.com/arquivos/ids/567582/64965_1.jpg?v=638609918304500000', description: 'Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados', priceOld: 799.99, price: 549.99 },
        { id: 3, name: 'Asics Upcourt 4', image: 'https://static.prospin.com.br/media/catalog/product/cache/6e59e4946046b080cb91aa3230980e44/1/0/1071a053-001-tenis-asics-upcourt-4-preto-dourado-e-prata.jpg', description: 'Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados', priceOld: 799.99, price: 549.99 },
        { id: 4, name: 'Adidas Alphaedge+', image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/5e1ea602f2c646df880507e19e6dcdd0_9366/Tenis_AlphaEdge_Azul_IE3887_01_standard.jpg', description: 'Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados', priceOld: 799.99, price: 549.99 },
        { id: 5, name: 'New Balance 520', image: 'https://cdn.bnws3.com.br/b2online.com.br/image/cache/data/produtos/new-balance/masculino/tenis-new-balance-520-v9-masculino-preto---cinza-14645-25-04-03-1200x1200.jpg', description: 'Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados', priceOld: 799.99, price: 79.99 },
        { id: 6, name: 'Vans Filmore', image: 'https://imgcentauro-a.akamaihd.net/1200x1200/97576107A9.jpg', description: 'Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados', priceOld: 799.99, price: 549.99 },
        { id: 7, name: 'Asics Gel-Cumulus 24', image: 'https://static.netshoes.com.br/produtos/tenis-asics-gel-cumulus-24-se-masculino/23/2FV-8437-223/2FV-8437-223_zoom1.jpg?ts=1695439584&ims=544x', description: 'Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados', priceOld: 799.99, price: 549.99 },
        { id: 8, name: 'Sneaker Branco', image: 'data:image/jpeg;base64,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', description: 'Tênis da linhagem Nike Air Max de coloração branca e tons acinzentados', priceOld: 799.99, price: 549.99 }
    ];

    return (
        <div className="container" id="cards"
            ref={containerRef}
            onMouseDown={ButtonPressed}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
        >
            <img src={Logo} alt="" className="logoOnce" />
            <h2 className="title-carousel">TOP VENDAS<br></br></h2>
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
