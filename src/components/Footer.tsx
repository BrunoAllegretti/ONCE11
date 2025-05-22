import './Footer.css'

export default function Footer() {

  return (
    <>
      <footer>
      <div className="containerFooter">
    <div className="column" id='primeiro'>
      <h2 className="title-footer">Masculino</h2>
        <div className="columnD">
          <ul className="footerUl" id='UlF'>
            <li><a href="#">Tênis</a></li>
            <li><a href="#">Shorts</a></li>
            <li><a href="#">Bermudas</a></li>
            <li><a href="#">Calças</a></li>
            <li><a href="#">Camisetas Dry Fit</a></li>
            <li><a href="#">Moletons e Jaquetas</a></li>
          </ul>
        </div>
    </div>
    <div className="column">
      <h2 className="title-footer">Esportivos</h2>
        <div className="columnD">
          <ul className="footerUl" id='UlF'>
            <li className="footerLi"><a href="#">Camisetas futebol</a></li>
            <li className="footerLi"><a href="#">Agasalhos futebol</a></li>
            <li className="footerLi"><a href="#">Camisas basquete</a></li>
            <li className="footerLi"><a href="#">Regatas Basquete</a></li>
            <li className="footerLi"><a href="#">Corta Vento</a></li>
          </ul>
        </div>
    </div>
    <div className="column" id='final'>
      <h2 className="title-footer">Feminino</h2>
        <div className="columnD">
          <ul className="footerUl" id='UL'>
            <li className="footerLi"><a href="#">Tênis</a></li>
            <li className="footerLi"><a href="#">Shorts</a></li>
            <li className="footerLi"><a href="#">Bermudas</a></li>
            <li className="footerLi"><a href="#">Calças Legging</a></li>
            <li className="footerLi"><a href="#">Moletons e Jaquetas</a></li>
          </ul>
        </div>
    </div>
  </div>
      </footer>
    </>
  )
}