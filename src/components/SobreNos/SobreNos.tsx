import './SobreNos.css';
import ONCE from '../../assets/img/O11CE.png';
import NP from '../../assets/img/nossosProdutos.png';

export default function SobreNos() {
  return (
    <div className="sobre-nos">
      {/* Seção Sobre Nós */}
      <section className="sobre-nos-section">
        <div className="containerS">
          <div className="texts">
            <h1 className="main-title">Sobre Nós</h1>
            <p className="intro-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          
          <div className="quem-somos">
            <h2 className="quem-somosH2">QUEM SOMOS</h2>
            <p className="intro-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
            </p>
          </div>
        </div> 
          <div className="logo-placeholder">
              <img src={ONCE} className='once11' alt="" />
          </div>
        </div>
      </section>

      {/* Seção Nossos Produtos */}
      <section className="produtos-section">
        <div className="containerE">
          <h2 className='H2'>
            Nossos Produtos
          </h2>
          <p className="intro-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          
          <div className="produto-destaque">
            <img 
              src={NP}
              alt="Tênis verde e branco" 
              className="produto-imagem"
            />
          </div>
        </div>
      </section>

      {/* Seção Nossa Equipe */}

<section className="equipe-section">
  <div className="containerM">
    <h2 className="main-title2">Nossa Equipe</h2>

    <div className="equipe-bloco">
      
      {/* Membro 1 */}
      <div className="membro-box membro1">
        <img src="" className="imagem-bloco"></img>
        <div className="textsS">
          <p className="nome-membro">Bruno de Pádua Allegretti Sousa</p>
          <p className="descricao">
            Apaixonado por tecnologia e esportes, Bruno atua como desenvolvedor full stack, com domínio em JavaScript, Node.js, React e Tree.js. Ele foi responsável por integrar todo o sistema do site, garantindo performance, segurança e responsividade.
          </p>
        </div>
      </div>

      {/* Membro 2 */}
      <div className="membro-box membro2">
        <img src="" className="imagem-bloco"></img>
        <div className="textsS">
        <p className="nome-membro">João Henrique Ramos Grangeiro</p>
        <p className="descricao">
          Especialista em design de interfaces, responsável pelo layout e visual do site, usando Figma e princípios de UX/UI.
        </p>
        </div>
      </div>

      {/* Membro 3 */}
      <div className="membro-box membro1">
        <img src="" className="imagem-bloco"></img>
        <div className="textsS">
        <p className="nome-membro">Leonardo Martins Borges</p>
        <p className="descricao">
          Responsável pelas animações e otimizações visuais com HTML, CSS e JavaScript. Foco em experiência fluida.
        </p>
        </div>
      </div>

      {/* Membro 4 */}
      <div className="membro-box membro2">
        <img src="" className="imagem-bloco"></img>
        <div className="textsS">
        <p className="nome-membro">Iago Carvalho Cabral</p>
        <p className="descricao">
          Especialista em marketing digital e SEO, responsável por otimizar o alcance do site e melhorar a performance de buscas.
        </p>
        </div>
      </div>

      {/* Membro 5 */}
      <div className="membro-box membro1">
        <img src="" className="imagem-bloco"></img>
        <div className="textsS">
        <p className="nome-membro">Leonardo Di Ciommo</p>
        <p className="descricao">
          Especialista em marketing digital e SEO, responsável por otimizar o alcance do site e melhorar a performance de buscas.
        </p>
        </div>
      </div>

      {/* Membro 6 */}
      <div className="membro-box membro2">
        <img src="" className="imagem-bloco"></img>
        <div className="textsS">
        <p className="nome-membro">Brayan Medeiros Pires</p>
        <p className="descricao">
          Especialista em marketing digital e SEO, responsável por otimizar o alcance do site e melhorar a performance de buscas.
        </p>
        </div>
      </div>

      {/* Membro 7 */}
      <div className="membro-box membro1">
        <img src="" className="imagem-bloco"></img>
        <div className="textsS">
        <p className="nome-membro">Vitor Henry de Souza Camilo Miranda</p>
        <p className="descricao">
          Especialista em marketing digital e SEO, responsável por otimizar o alcance do site e melhorar a performance de buscas.
        </p>
        </div>
      </div>

    </div>
  </div>
</section>
</div>
  )
}