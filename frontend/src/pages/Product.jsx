import { useState, useEffect, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { LanguageContext } from '@src/App';
import NavBar from '@components/Navbar';
import Header from '@components/Header';
import ContentWrapper from '@components/ContentWrapper';
import ItemCard from '@components/ItemCard';
import { exchangeRate, translation } from '@utils/Helpers';
import { languageToCurrency } from '@utils/Constants';
import productsDatabase from '@data/productsDatabase.json';
import SEO from '@utils/SEO';
import Breadcrumbs from '@utils/Breadcrumbs';

function Product(props) {
  const [currencyExchangeRate, setCurrencyExchangeRate] = useState(0);
  const { language } = useContext(LanguageContext);
  const location = useLocation();
  const category = props.category;
  const categoryIDs = Object.keys(productsDatabase[category]);
  
  // Map camelCase category names to translation key format (with dots)
  const categoryToTranslationKey = {
    'roeDeer': 'roe.deer',
    'wildBoar': 'wild.boar',
    'predators': 'predators',
    'redDeer': 'red.deer',
    'skins': 'skins',
    'others': 'others'
  };
  
  const categoryTranslationKey = categoryToTranslationKey[category] || category;
  const categoryName = translation(language, `transl.category.title.${categoryTranslationKey}`);
  const categoryPath = location.pathname;

  useEffect(() => {
    const fetchCurrencyExchangeRate = async () => {
      const rate = await exchangeRate(languageToCurrency[language]);
      setCurrencyExchangeRate(rate);
    };

    fetchCurrencyExchangeRate();
  }, [language, category]);

  // Generate product schemas for structured data
  const productSchemas = useMemo(() => {
    return categoryIDs.map((id) => {
      const product = productsDatabase[category][id];
      const productImages = product.images.map(img => `https://taxidermypoland.com${img.src}`);
      const price = Array.isArray(product.price) ? product.price[0] : product.price;
      const productTitle = product[language]?.title || product['en-GB']?.title;
      const productDescription = product[language]?.descriptionTemplate || product['en-GB']?.descriptionTemplate;
      
      return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": productTitle,
        "description": productDescription,
        "image": productImages.length > 0 ? productImages : [`https://taxidermypoland.com/assets/images/logo.avif`],
        "sku": id,
        "brand": {
          "@type": "Brand",
          "name": "Taxidermy Poland"
        },
        "category": categoryName,
        "offers": {
          "@type": "Offer",
          "price": price.toString(),
          "priceCurrency": languageToCurrency[language],
          "availability": "https://schema.org/InStock",
          "url": `https://taxidermypoland.com${categoryPath}`,
          "seller": {
            "@type": "Organization",
            "name": "Taxidermy Poland"
          }
        }
      };
    });
  }, [categoryIDs, category, language, categoryPath, categoryName]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${categoryName} - Taxidermy Poland`,
    "description": `Browse our collection of ${categoryName.toLowerCase()} taxidermy specimens. High-quality European wildlife preservation.`,
    "url": `https://taxidermypoland.com${categoryPath}`
  };

  return (
    <>
      <SEO
        title={`${categoryName} - Taxidermy Poland | European Wildlife Specimens`}
        description={`Browse our collection of ${categoryName.toLowerCase()} taxidermy specimens. High-quality European wildlife preservation and taxidermy art.`}
        path={categoryPath}
        language={language}
      />
      <Breadcrumbs language={language} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(collectionSchema)}
        </script>
        {productSchemas.map((schema, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>
      <NavBar expand='lg' dark />
      <Header />
      <ContentWrapper>
        {categoryIDs.map((id) => {
          const product = productsDatabase[category][id];
          return (
            <ItemCard
              key={id}
              images={product.images}
              idTitle={translation(language, 'transl.product.idTitle')}
              id={id}
              title={product[language].title}
              descriptionTemplate={product[language].descriptionTemplate}
              dimensions={product.dimensions}
              priceTitle={translation(language, 'transl.product.priceTitle')}
              price={product.price}
              exchangeRate={currencyExchangeRate}
              currency={languageToCurrency[language]}
            />
          );
        })}
      </ContentWrapper>
    </>
  );
}

export default Product;
