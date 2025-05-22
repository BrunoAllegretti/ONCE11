import './Header.css'

export default function Header() {

  return (
    <>
      <header>
        <h2>Once 11</h2>
        <nav>
            <ul>
                <li>Entrar</li>
                <li>Produtos</li>
                <li>Promoções</li>
                <li>Sobre Nós</li>
            </ul>
        </nav>

        <div className='search'>
            <h2>Busca</h2>
            <span className="material-symbols-outlined">search</span>
        </div>

        <button className="cart">
        <span className="material-symbols-outlined">shopping_cart</span>
        </button>
      </header>
    </>
  )
}