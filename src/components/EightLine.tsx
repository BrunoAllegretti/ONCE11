import './EightLine.css';
import eight from '../assets/img/eight.png';
import camisaB from '../assets/img/camisaB.png';
import logo8 from '../assets/img/logo8.png';


export default function EightL() {
  return (
    <>
        <section className="sectionEight">
            <h2 className="title">8 LINE</h2>

            <div className="eight">
                <div className="small-circle">
                    <div className="small-circle2"></div> 
                </div>
                <div className="big-circle">
                    <div className="big-circle2"></div>
                </div>
            </div>

            <div className="divEight">
                <p className="desc" id='first'>A 8 Line não é apenas uma linha de jerseys, é um símbolo
                de determinação, estilo e atitude dentro e fora do jogo. Inspirada na força 
                dos atletas e na energia das ruas, cada peça combina design inovador, conforto 
                premium e tecnologia de alto desempenho.<br></br>
                <br></br>
                Seja nas quadras, nos campos ou no dia a dia, a 8 Line veste aqueles que jogam 
                para vencer. Escolha sua cor, vista sua paixão e entre para a linha de frente. #8Line
                </p>
                
                <img src={eight} alt="" className="img" id='img1'/>

                <p className="desc" id='second'>O número 8 sempre esteve presente na história do esporte, vestindo ídolos que desafiaram limites e inspiraram gerações.
                <br></br><br></br>
                Grandes jogadores imortalizaram esse número em diferentes modalidades. No futebol, Steven Gerrard usou a camisa 8 como líder e símbolo do Liverpool. No basquete, Kobe Bryant, em sua primeira fase nos Lakers, redefiniu o jogo com habilidades inigualáveis e uma mentalidade feroz, tornando-se um dos maiores de todos os tempos. No futebol americano, lendas como Lamar Jackson mostram que o número 8 é sinônimo de talento e superação.
                <br></br><br></br>
                Nenhum jogador representou o espírito do número 8 melhor do que Kobe Bryant. Entre 1996 e 2006, ele usou essa camisa para construir uma das carreiras mais dominantes da NBA, incluindo performances lendárias como os 81 pontos em um único jogo. Sua mentalidade “Mamba Mentality” ensinou ao mundo que o trabalho duro e a dedicação absoluta são a chave para o sucesso.
                </p>
            
                <img src={camisaB} alt="" className="img" id='img2'/>
                <img src={logo8} alt="" className="logo" />
            </div>
        </section>
    </>
  );
}
