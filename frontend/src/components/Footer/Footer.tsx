import './Footer.css'
import logo from '../../assets/img/logoFooter.png'
import { useLanguage } from '../../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer>
      <div className="containerFooter">
        <div className="footer-column">
          <h2 className="title-footer">{t('heading_support')}</h2>
          <ul className="footer-list list1">
            <li><a href="#">{t('link_customer_service')}</a></li>
            <li><a href="#">{t('link_payment_methods')}</a></li>
            <li><a href="#">{t('link_faq')}</a></li>
            <li><a href="#">{t('link_cookies')}</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h2 className="title-footer">{t('heading_tabs')}</h2>
          <ul className="footer-list list2">
            <li><a href="#">{t('link_footer_login')}</a></li>
            <li><a href="#">{t('link_footer_collections')}</a></li>
            <li><a href="#">{t('link_footer_search')}</a></li>
            <li><a href="#">{t('link_footer_cart')}</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h2 className="title-footer">{t('heading_contact_us')}</h2>
          <ul className="footer-list list3">
            <li><a href="#">{t('link_email')}</a></li>
            <li><a href="#">{t('text_address')}</a></li>
            <li><a href="#">{t('link_phone')}</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h2 className="title-footer">{t('heading_follow_us')}</h2>
          <ul className="footer-list list4">
            <li><a href="#">{t('link_youtube')}</a></li>
            <li><a href="#">{t('link_instagram')}</a></li>
            <li><a href="#">{t('link_twitter')}</a></li>
          </ul>
        </div>
      </div>

      <hr className='line'/>

      <img src={logo} alt="Once" className='whiteLogo'/>
    </footer>
  )
}
