import './Footer.css'
import logo from '../../assets/img/logoFooter.png'

export default function Footer() {
  return (
    <footer>
      <div className="containerFooter">
        <div className="footer-column">
          <h2 className="title-footer">Suporte</h2>
          <ul className="footer-list list1">
            <li><a href="#">Atendimento ao cliente</a></li>
            <li><a href="#">Formas de pagamento</a></li>
            <li><a href="#">Dúvidas frequentes</a></li>
            <li><a href="#">Cookies</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h2 className="title-footer">Abas</h2>
          <ul className="footer-list list2">
            <li><a href="#">Login</a></li>
            <li><a href="#">Coleções</a></li>
            <li><a href="#">Busca</a></li>
            <li><a href="#">Carrinho</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h2 className="title-footer">Contate-nos</h2>
          <ul className="footer-list list3">
            <li><a href="#">once11@gmail.com</a></li>
            <li><a href="#">Av. Bahia, 1739 - Indaiá,<br></br> Caraguatatuba - SP,<br></br> Brazil, 11665-310</a></li>
            <li><a href="#">+55 12 99170-9082</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h2 className="title-footer">Siga-nos</h2>
          <ul className="footer-list list4">
            <li><a href="#">Login</a></li>
            <li><a href="#">Coleções</a></li>
            <li><a href="#">Busca</a></li>
            <li><a href="#">Carrinho</a></li>
          </ul>
        </div>
      </div>

      <hr className='line'/>

      <img src={logo} alt="Once" className='whiteLogo'/>
    </footer>
  )
}
