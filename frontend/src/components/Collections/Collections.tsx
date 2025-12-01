import './Collections.css';
import Collection from './Collection'
import SecProducts from './SecProducts';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function Collections() {
  const { t } = useLanguage();

  return (
    <>
  
        <div className="container-collections">
          <h2 className="title-colletions">{t('heading_collection_prefix')}<span>{t('heading_collection_highlight')}</span>{t('heading_collection_suffix')}</h2>

            <Collection />
            <SecProducts/>


          <div className="ty">
            <h2 className='Ser'>{t('heading_we_will_all')}<br></br> {t('heading_be_winners')}</h2>
            
          <Link to="/campanha" className="campanha">
            <button className="visualizeButton">{t('button_view_campaign')}</button>
          </Link>
          </div>
        </div>
    </>
  );
}
