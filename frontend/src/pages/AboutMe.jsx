import { useContext } from 'react';
import { LanguageContext } from '@src/App';
import NavBar from '@components/Navbar';
import Header from '@components/Header';
import ContentWrapper from '@components/ContentWrapper';
import { translation } from '@utils/Helpers';
import SEO from '@utils/SEO';
import Breadcrumbs from '@utils/Breadcrumbs';
import '@styles/about-me-purchase-payment.css';

function AboutMe() {
  const { language } = useContext(LanguageContext);
  const pageTitle = translation(language, 'transl.about.me.title');
  const pageDescription = translation(language, 'transl.about.me.content');

  return (
    <>
      <SEO
        title={`${pageTitle} - Taxidermy Poland | Master Craftsman Since 1997`}
        description={pageDescription.substring(0, 155) + '...'}
        path="/about-me"
        language={language}
      />
      <Breadcrumbs language={language} />
      <NavBar expand='lg' dark />
      <Header />
      <ContentWrapper>
        <h3 className='mb-4 text-center fw-bold'>{pageTitle}</h3>
        <span className='section-content'>
          {pageDescription}
        </span>
      </ContentWrapper>
    </>
  );
}

export default AboutMe;
