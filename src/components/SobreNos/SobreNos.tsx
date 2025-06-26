import './SobreNos.css';
import ONCE from '../../assets/img/O11CE.png';
import NP from '../../assets/img/nossosProdutos.png';
import Tenis from '../../assets/img/tenis.webp';
import ONCE20 from '../../assets/img/once20.png';
import Bruno from '../../assets/img/incellbit.png';
import Martins from '../../assets/img/titan.jpg';
import João from '../../assets/img/joaohenrique.png';

export default function SobreNos() {
  return (
    <div className="sobre-nos">
      {/* Seção Sobre Nós */}
      <section className="sobre-nos-section">
        <div className="containerS">
          <div className="texts">
            <h1 className="main-title">Sobre Nós</h1>
            <p className="intro-text">
              Nosso site de venda de produtos esportivos é resultado do trabalho de uma equipe de desenvolvimento comprometida e multidisciplinar. Contamos com desenvolvedores front-end e back-end, designers e especialistas em segurança, todos focados em oferecer uma plataforma rápida, segura e fácil de usar.
              A equipe trabalha de forma colaborativa, utilizando metodologias ágeis para implementar melhorias constantes. O objetivo é garantir uma experiência de compra eficiente, com navegação intuitiva e um visual moderno, sempre alinhado ao universo esportivo.
            </p>
          
          <div className="quem-somos">
            <h2 className="quem-somosH2">QUEM SOMOS</h2>
            <p className="intro-text">
              Somos uma empresa apaixonada por esporte e tecnologia. Criamos este site com o objetivo de oferecer aos nossos clientes uma experiência prática, segura e agradável na hora de comprar produtos esportivos.

              Nossa equipe é formada por profissionais de diferentes áreas — desenvolvimento, design, atendimento e logística — que trabalham juntos para garantir uma plataforma moderna, com navegação intuitiva e um catálogo completo, sempre atualizado com as melhores marcas e novidades do mercado.

              Acreditamos que o esporte move pessoas, inspira saúde, bem-estar e superação. Por isso, nos dedicamos todos os dias a conectar você ao que há de melhor nesse universo.

              Seja qual for sua modalidade, estamos aqui para ajudar você a alcançar seus objetivos.
            </p>
          </div>
        </div> 
          <div className="logo-placeholder">
              <img src={ONCE20} className='once20' alt="" />
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
            Oferecemos uma ampla variedade de produtos voltados para todos os tipos de esportes. Aqui, você encontra desde roupas, calçados e acessórios até equipamentos completos para atividades como futebol, corrida, musculação e muito mais.

Trabalhamos com marcas reconhecidas no mercado, garantindo qualidade, conforto e desempenho para atletas de todos os níveis. Seja para treinar, competir ou praticar por lazer, temos tudo o que você precisa para se manter em movimento.
          </p>
          
          <div className="produto-destaque">
            <img 
              src={Tenis}
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
        <img src={Bruno} className="imagem-bloco" alt="Bruno" />
        <div className="textsS">
          <p className="nome-membro">Bruno de Pádua Allegretti Sousa</p>
          <p className="descricao">
            Apaixonado por tecnologia e esportes, Bruno atua como desenvolvedor full stack, com domínio em JavaScript, Node.js, React e Tree.js. Ele foi responsável por integrar todo o sistema do site, garantindo performance, segurança e responsividade.
          </p>
        </div>
      </div>

      {/* Membro 2 */}
      <div className="membro-box membro2">
        <img src={João} className="imagem-bloco" alt="João" />
        <div className="textsS">
        <p className="nome-membro">João Henrique Ramos Grangeiro</p>
        <p className="descricao">
          Especialista em design de interfaces, responsável pelo layout e visual do site, usando Figma e princípios de UX/UI.
        </p>
        </div>
      </div>

      {/* Membro 3 */}
      <div className="membro-box membro1">
        <img src={Martins} className="imagem-bloco" alt="Martins" />
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
        <p className="nome-membro">Iago Carvalho Cabral Martins</p>
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