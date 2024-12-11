import { useContext } from 'react';
import { LanguageContext } from '@src/App';
import NavBar from '@components/Navbar';
import Header from '@components/Header';
import ContentWrapper from '@components/ContentWrapper';
import { translation } from '@utils/Helpers';

function PurchasePayment() {
  const { language } = useContext(LanguageContext);

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
        <span className='mb-4'>
          {translation(language, 'transl.purchase.payment.purchase.content')}
        </span>
        <h5>
          {translation(language, 'transl.purchase.payment.payment.title')}
        </h5>
        <span className='mb-4'>
          {translation(language, 'transl.purchase.payment.payment.content')}
        </span>
      </ContentWrapper>
    </>
  );
}

export default PurchasePayment;
