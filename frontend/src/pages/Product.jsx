import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '@src/App';
import NavBar from '@components/Navbar';
import Header from '@components/Header';
import ContentWrapper from '@components/ContentWrapper';
import ItemCard from '@components/ItemCard';
import { exchangeRate, translation } from '@utils/Helpers';
import { languageToCurrency } from '@utils/Constants';
import productsDatabase from '@data/productsDatabase.json';

function Product(props) {
  const [currencyExchangeRate, setCurrencyExchangeRate] = useState(0);
  const { language } = useContext(LanguageContext);
  const category = props.category;
  const categoryIDs = Object.keys(productsDatabase[category]);

  useEffect(() => {
    const fetchCurrencyExchangeRate = async () => {
      const rate = await exchangeRate(languageToCurrency[language]);
      setCurrencyExchangeRate(rate);
    };

    fetchCurrencyExchangeRate();
  }, [language, category]);

  return (
    <>
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
