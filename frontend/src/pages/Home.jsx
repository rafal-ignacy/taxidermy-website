import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { LanguageContext } from '@src/App';
import NavBar from '@components/Navbar';
import Header from '@components/Header';
import CategoryThumbnailsRow from '@components/CategoryThumbnailsRow';
import SEO from '@utils/SEO';
import Breadcrumbs from '@utils/Breadcrumbs';

function Home() {
  const { language } = useContext(LanguageContext);
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Taxidermy Poland",
    "url": "https://taxidermypoland.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://taxidermypoland.com/assets/images/logo.avif"
    },
    "description": "Master taxidermy craftsman specializing in European wildlife specimens since 1997. High-quality taxidermy art and preserved animals.",
    "foundingDate": "1997",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PL"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@taxidermypoland.com",
      "contactType": "Customer Service",
      "availableLanguage": ["en-GB", "en-US", "de-DE", "pl-PL"]
    },
    "sameAs": []
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Taxidermy Poland",
    "url": "https://taxidermypoland.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://taxidermypoland.com/products/{search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <SEO
        title="Taxidermy Poland | European Wildlife Specimens & Taxidermy Art"
        description="Discover the impressive portfolio of a master taxidermy craftsman, showcasing a diverse collection of European wildlife specimens. High-quality taxidermy art since 1997."
        path="/"
        language={language}
      />
      <Breadcrumbs language={language} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      </Helmet>
      <NavBar expand='lg' dark />
      <Header/>
      <CategoryThumbnailsRow/>
    </>
  );
}

export default Home;
