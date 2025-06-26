import './Footer.css'

export default function Footer() {
  return (
    <footer>
      <div className="containerFooter">
        <div className="footer-column">
          <h2 className="title-footer">Suporte</h2>
          <ul className="footer-list">
            <li><a href="#">Atendimento ao cliente</a></li>
            <li><a href="#">Formas de pagamento</a></li>
            <li><a href="#">Dúvidas frequentes</a></li>
            <li><a href="#">Cookies</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h2 className="title-footer">Produtos</h2>
          <ul className="footer-list">
            <li><a href="#">Tênis</a></li>
            <li><a href="#">Camisas</a></li>
            <li><a href="#">Partes Inferiores</a></li>
            <li><a href="#">Meias</a></li>
            <li><a href="#">Blusas</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h2 className="title-footer">Siga-nos</h2>
          <ul className="footer-list">
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Youtube</a></li>
            <li><a href="#">Twitter</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
