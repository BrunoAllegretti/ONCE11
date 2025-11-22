import './Campanha.css'
import campanha from '../../assets/img/campanha.png';
import oluwakemi from '../../assets/img/Oluwakemi.png';
import rafaela from '../../assets/img/Rafaela.png';
import vinicius from '../../assets/img/Vinicius.png';
import kid from '../../assets/img/Kid.mp4';

export default function Campanha() {
    return(
        <>
        <section className='campanha-section'>
            <div className='campanha-desc'>
                <h3 className='campH3'>Campanha</h3>
                <h2 className='campH2'>Seremos Todos<br></br>Vencedores</h2>
                <p className='campP'>
                <b>1,4 bilhão</b> de crianças com idade entre 0-15 anos não têm nenhuma forma de proteção social 
                básica. Por isso, a ONCE em parceria com a UNICEF, ILO e Save the Children, está realizando 
                uma ação de caridade, onde você pode contribuir.
                </p>

                <div className="ongs">
                    <img src={campanha} />
                </div>
            </div>

            <div className='section-video'>
                <h2>Como <b>VOCÊ</b> pode ajudar</h2>
                <img className="camMP4" src="" alt="" />
            </div>

            <div>
                <div className='camTitle'>
                    <hr/>
                    <h2>Histórias<br></br>Inpiradores</h2>
                </div>

                <div>
                <img className="img-athlete" src={oluwakemi}/>
                <h3 className='h3-athlete'>Oluwakemi<br></br> Musa</h3>
                <p className='text-athlete'>Oluwakemi Musa cresceu nas ruas de Lagos, envolvida com gangues e distante da escola. Foi levada pela polícia a um centro de reabilitação apoiado pelo UNICEF, onde recebeu acolhimento, educação e treinamento profissional. Longe das ruas, reencontrou o basquete e transformou sua vida. Competiu nos Special Olympics em Chicago e Abu Dhabi, tornando-se Embaixadora das Special Olympics Nigéria. Hoje inspira outros jovens, provando que até na miséria pode germinar grandeza — basta uma oportunidade para florescer.</p>
                </div>

                <div>
                <img className="img-athleteR" src={rafaela}/>
                <h3 className='h3-athleteR'>Rafaela<br></br>  Silva</h3>
                <p className='text-athlete'>Rafaela Silva nasceu na favela da Cidade de Deus, no Rio de Janeiro, cercada por violência e pobreza. Desde pequena, seus pais a colocaram no Instituto Reação, projeto de judô que oferecia disciplina, educação e oportunidades. Transformando sua força e raiva em foco, Rafaela conquistou títulos nacionais e internacionais, culminando com o ouro olímpico no Rio‑2016. Sua trajetória é exemplo de superação, mostrando que apoio, talento e determinação podem transformar adversidade em conquista.</p>
                </div>

                <div>
                <img className="img-athlete3" src={vinicius}/>
                <h3 className='h3-athlete'>Vinícius R.<br></br>  Bento</h3>
                <p className='text-athlete'>Vinícius Rodrigues Bento, natural de Primavera (SP) e criado em Maringá (PR), sofreu um acidente de moto aos 19 anos que resultou na amputação de sua perna direita. Enfrentando limitações financeiras, encontrou no esporte paralímpico uma nova chance de vida. Com apoio do Programa Bolsa Atleta, treinou e competiu em alto nível, conquistando a medalha de prata nos 100 metros T63 nos Jogos Paralímpicos de Tóquio‑2020 e estabelecendo recordes mundiais. Sua história é exemplo de superação e resiliência frente à adversidade.</p>
                </div>

                
                <hr className='Lhr'/>

                <div className='donate'>
                <div className="text-donate">
                    <h3>Agora é sua vez</h3>
                        <p>
                        A campanha não entrega apenas equipamentos, entrega oportunidades. 
                        Cada bola, cada raquete, cada par de tênis representa a possibilidade de que uma criança 
                        em situação de vulnerabilidade descubra seu talento, encontre disciplina, confiança e 
                        até uma nova trajetória de vida, assim como Rafaela, Oluwakemi e Vinícius. Ao apoiar o 
                        Seremos Todos Vencedores, cada doação se transforma em um passo para mudar histórias, 
                        abrir portas e mostrar que, com acesso ao esporte, qualquer criança pode superar 
                        obstáculos aparentemente intransponíveis.
                        </p>
                        
                        <button className='Doar'>Doar</button>
                </div>

                <div className="donateMP4">
                    <video src={kid} autoPlay muted loop></video>
                </div>
                </div>
            </div>
        </section>
        </>
    )
}