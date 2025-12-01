import './Campanha.css'
import campanha from '../../assets/img/campanha.png';
import oluwakemi from '../../assets/img/Oluwakemi.png';
import rafaela from '../../assets/img/Rafaela.png';
import vinicius from '../../assets/img/Vinicius.png';
import kid from '../../assets/img/Kid.mp4';
import video from '../../assets/img/leomartins.mp4';
import { useLanguage } from '../../context/LanguageContext';

export default function Campanha() {
    const { t } = useLanguage();

    return(
        <>
        <section className='campanha-section'>
            <div className='campanha-desc'>
                <h3 className='campH3'>{t('heading_campaign')}</h3>
                <h2 className='campH2'>{t('heading_we_will_all_winners')}</h2>
                <p className='campP'>
                {t('paragraph_campaign_description')}
                </p>

                <div className="ongs">
                    <img src={campanha} />
                </div>
            </div>

            <div className='section-video'>
                <h2>{t('heading_how')} <b>{t('heading_you_emphasis')}</b> {t('heading_can_help')}</h2>
                <video className="camMP4" src={video} controls />
            </div>

            <div>
                <div className='camTitle'>
                    <hr/>
                    <h2>{t('heading_stories')}<br></br>{t('heading_inspiring')}</h2>
                </div>

                <div>
                <img className="img-athlete" src={oluwakemi}/>
                <h3 className='h3-athlete'>{t('heading_athlete_oluwakemi')}<br></br> {t('heading_athlete_musa')}</h3>
                <p className='text-athlete'>{t('paragraph_athlete_oluwakemi_story')}</p>
                </div>

                <div>
                <img className="img-athleteR" src={rafaela}/>
                <h3 className='h3-athleteR'>{t('heading_athlete_rafaela')}<br></br>  {t('heading_athlete_silva')}</h3>
                <p className='text-athlete'>{t('paragraph_athlete_rafaela_story')}</p>
                </div>

                <div>
                <img className="img-athlete3" src={vinicius}/>
                <h3 className='h3-athlete'>{t('heading_athlete_vinicius')}<br></br>  {t('heading_athlete_bento')}</h3>
                <p className='text-athlete'>{t('paragraph_athlete_vinicius_story')}</p>
                </div>

                
                <hr className='Lhr'/>

                <div className='donate'>
                <div className="text-donate">
                    <h3>{t('heading_your_turn')}</h3>
                        <p>
                        {t('paragraph_campaign_message')}
                        </p>
                        
                        <button className='Doar'>{t('button_donate')}</button>
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