import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://taxidermypoland.com';

export const SEO = ({ 
  title, 
  description, 
  path, 
  image = '/assets/images/logo.avif',
  type = 'website',
  language = 'en-GB',
  noindex = false
}) => {
  const location = useLocation();
  const fullUrl = `${BASE_URL}${path || location.pathname}`;
  const imageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`;
  
  // Language mapping for hreflang
  const languageMap = {
    'en-GB': 'en-GB',
    'en-US': 'en-US',
    'de-DE': 'de-DE',
    'pl-PL': 'pl-PL'
  };
  
  const alternateLanguages = Object.keys(languageMap).filter(lang => lang !== language);
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Taxidermy Poland" />
      <meta property="og:locale" content={language.replace('-', '_')} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Hreflang tags for alternate languages */}
      <link rel="alternate" hreflang={language} href={fullUrl} />
      {alternateLanguages.map(lang => (
        <link key={lang} rel="alternate" hreflang={lang} href={fullUrl} />
      ))}
      <link rel="alternate" hreflang="x-default" href={fullUrl} />
    </Helmet>
  );
};

export default SEO;

