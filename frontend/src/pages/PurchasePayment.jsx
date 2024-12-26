import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { LanguageContext } from '@src/App';
import NavBar from '@components/Navbar';
import Header from '@components/Header';
import ContentWrapper from '@components/ContentWrapper';
import { translation } from '@utils/Helpers';
import '@styles/about-me-purchase-payment.css';

function PurchasePayment() {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleContactFormRedirect = () => {
    navigate('/contact');
  };

  return (
    <>
      <NavBar expand='lg' dark />
      <Header />
      <ContentWrapper>
        <h3 className='mb-4 text-center fw-bold'>
          {translation(language, 'transl.purchase.payment.title')}
        </h3>
        <h5>
          {translation(language, 'transl.purchase.payment.purchase.title')}
        </h5>
        <span className='mb-4 section-content'>
          {translation(language, 'transl.purchase.payment.purchase.content')}
        </span>
        <h5>
          {translation(language, 'transl.purchase.payment.payment.title')}
        </h5>
        <span className='mb-4 section-content'>
          {translation(language, 'transl.purchase.payment.payment.content')}
        </span>
        <div className='button-section'>
          <Button
            className='mt-2'
            color='success'
            type='submit'
            onClick={() => handleContactFormRedirect()}
          >
            {translation(language, 'transl.purchase.payment.contact.redirect.button')}
          </Button>
        </div>
      </ContentWrapper>
    </>
  );
}

export default PurchasePayment;
