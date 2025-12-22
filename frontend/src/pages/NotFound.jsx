import { useContext } from 'react';
import { Alert } from 'reactstrap';
import { LanguageContext } from '@src/App';
import NavBar from '@components/Navbar';
import Header from '@components/Header';
import ContentWrapper from '@components/ContentWrapper';
import { translation } from '@utils/Helpers';
import SEO from '@utils/SEO';

function NotFound() {
  const { language } = useContext(LanguageContext);
  return (
    <>
      <SEO
        title="Page Not Found - Taxidermy Poland"
        description="The page you are looking for could not be found."
        path="/404"
        language={language}
        noindex={true}
      />
      <NavBar expand='lg' dark />
      <Header />
      <ContentWrapper>
        <Alert color='danger'>
          <span className='fw-bold text-danger'>{translation(language, 'transl.page.not.found')}</span>
        </Alert>
      </ContentWrapper>
    </>
  );
}

export default NotFound;
