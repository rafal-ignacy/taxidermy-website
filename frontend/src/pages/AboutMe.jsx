import { useContext } from 'react';
import { LanguageContext } from '@src/App';
import NavBar from '@components/Navbar';
import Header from '@components/Header';
import ContentWrapper from '@components/ContentWrapper';
import { translation } from '@utils/Helpers';
import '@styles/about-me-purchase-payment.css';

function AboutMe() {
  const { language } = useContext(LanguageContext);

  return (
    <>
      <NavBar expand='lg' dark />
      <Header />
      <ContentWrapper>
        <h3 className='mb-4 text-center fw-bold'>{translation(language, 'transl.about.me.title')}</h3>
        <span className='section-content'>
          {translation(language, 'transl.about.me.content')}
        </span>
      </ContentWrapper>
    </>
  );
}

export default AboutMe;
