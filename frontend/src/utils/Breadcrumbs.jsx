import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { translation } from './Helpers';

const BASE_URL = 'https://taxidermypoland.com';

export const generateBreadcrumbs = (pathname, language) => {
  const breadcrumbs = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": translation(language, 'transl.navbar.home'),
      "item": BASE_URL
    }
  ];

  // Map paths to translation keys
  const pathMap = {
    '/products/roe-deer': 'transl.category.title.roe.deer',
    '/products/wild-boar': 'transl.category.title.wild.boar',
    '/products/predators': 'transl.category.title.predators',
    '/products/red-deer': 'transl.category.title.red.deer',
    '/products/skins': 'transl.category.title.skins',
    '/products/others': 'transl.category.title.others',
    '/about-me': 'transl.navbar.about.me',
    '/contact': 'transl.navbar.contact',
    '/shipping': 'transl.navbar.shipping',
    '/purchase-payment': 'transl.navbar.purchase.payment'
  };

  if (pathname !== '/') {
    const pathParts = pathname.split('/').filter(Boolean);
    let currentPath = '';

    pathParts.forEach((part, index) => {
      currentPath += `/${part}`;
      const position = index + 2;
      
      // Check if this path has a translation
      if (pathMap[currentPath]) {
        breadcrumbs.push({
          "@type": "ListItem",
          "position": position,
          "name": translation(language, pathMap[currentPath]),
          "item": `${BASE_URL}${currentPath}`
        });
      } else if (index === 0 && part === 'products') {
        // Handle products base path
        breadcrumbs.push({
          "@type": "ListItem",
          "position": position,
          "name": translation(language, 'transl.navbar.products'),
          "item": `${BASE_URL}/products`
        });
      }
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs
  };
};

export const Breadcrumbs = ({ language }) => {
  const location = useLocation();
  const breadcrumbSchema = generateBreadcrumbs(location.pathname, language);

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default Breadcrumbs;

