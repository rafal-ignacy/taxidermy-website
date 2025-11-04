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
        <span className='mb-4 section-content'>
          {translation(language, 'transl.purchase.payment.content')}
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
