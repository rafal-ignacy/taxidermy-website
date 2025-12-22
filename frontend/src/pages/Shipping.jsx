import { useContext, useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import { LanguageContext } from '@src/App';
import NavBar from '@components/Navbar';
import Header from '@components/Header';
import ContentWrapper from '@components/ContentWrapper';
import { exchangeRate, translation } from '@utils/Helpers';
import { languageToCurrency } from '@utils/Constants';
import shippingTable from '@data/shipping.json';
import SEO from '@utils/SEO';
import Breadcrumbs from '@utils/Breadcrumbs';

function Shipping() {
  const { language } = useContext(LanguageContext);
  const [shippingPrices, setShippingPrices] = useState(shippingTable);

  useEffect(() => {
    const fetchConvertedPrices = async () => {
      let convertedShippingPrices = {};
      const exchangeRateValue = await exchangeRate(
        languageToCurrency[language]
      );
      for (const key in shippingTable) {
        const price = shippingTable[key];
        const convertedPrice = Math.ceil(exchangeRateValue * price);
        convertedShippingPrices[key] = convertedPrice;
      }
      setShippingPrices(convertedShippingPrices);
    };

    fetchConvertedPrices();
  }, [language]);

  const pageTitle = translation(language, 'transl.shipping.title');
  const pageDescription = translation(language, 'transl.shipping.content');

  return (
    <>
      <SEO
        title={`${pageTitle} - Taxidermy Poland | International Shipping`}
        description={`${pageDescription.substring(0, 155)}... Shipping costs depend on package weight and destination.`}
        path="/shipping"
        language={language}
      />
      <Breadcrumbs language={language} />
      <NavBar expand="lg" dark />
      <Header />
      <ContentWrapper>
        <h3 className="mb-4 text-center fw-bold">
          {pageTitle}
        </h3>
        <span className="mb-4">
          {pageDescription}
        </span>
        <Table responsive>
          <thead>
            <tr className="table-success">
              <th />
              <th>
                {translation(language, 'transl.shipping.table.europe.economy')}
              </th>
              <th>
                {translation(language, 'transl.shipping.table.europe.express')}
              </th>
              <th>
                {translation(
                  language,
                  'transl.shipping.table.north.america.africa'
                )}
              </th>
              <th>
                {translation(
                  language,
                  'transl.shipping.table.south.america.asia'
                )}
              </th>
              <th>
                {translation(
                  language,
                  'transl.shipping.table.australia.oceania'
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className="table-success">
                {translation(language, 'transl.shipping.table.roe.deer')}
              </th>
              <td>
                {`${shippingPrices['roe.deer.europa.economy']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['roe.deer.europa.express']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['roe.deer.north.america.africa']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['roe.deer.south.america.asia']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['roe.deer.australia.oceania']}  ${languageToCurrency[language]}`}
              </td>
            </tr>
            <tr>
              <th scope="row" className="table-success">
                {translation(language, 'transl.shipping.table.roe.deer.board')}
              </th>
              <td>
                {`${shippingPrices['roe.deer.board.europa.economy']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['roe.deer.board.europa.express']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['roe.deer.board.north.america.africa']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['roe.deer.board.south.america.asia']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['roe.deer.board.australia.oceania']}  ${languageToCurrency[language]}`}
              </td>
            </tr>
            <tr>
              <th scope="row" className="table-success">
                {translation(language, 'transl.shipping.table.wild.boar')}
              </th>
              <td>
                {`${shippingPrices['wild.boar.europa.economy']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['wild.boar.europa.express']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['wild.boar.north.america.africa']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['wild.boar.south.america.asia']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['wild.boar.australia.oceania']}  ${languageToCurrency[language]}`}
              </td>
            </tr>
            <tr>
              <th scope="row" className="table-success">
                {translation(language, 'transl.shipping.table.wild.boar.board')}
              </th>
              <td>
                {`${shippingPrices['wild.boar.board.europa.economy']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['wild.boar.board.europa.express']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['wild.boar.board.north.america.africa']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['wild.boar.board.south.america.asia']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['wild.boar.board.australia.oceania']}  ${languageToCurrency[language]}`}
              </td>
            </tr>
            <tr>
              <th scope="row" className="table-success">
                {translation(language, 'transl.shipping.table.red.deer')}
              </th>
              <td>
                {`${shippingPrices['red.deer.europa.economy']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['red.deer.europa.express']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['red.deer.north.america.africa']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['red.deer.south.america.asia']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['red.deer.australia.oceania']}  ${languageToCurrency[language]}`}
              </td>
            </tr>
            <tr>
              <th scope="row" className="table-success">
                {translation(language, 'transl.shipping.table.red.fox.board')}
              </th>
              <td>
                {`${shippingPrices['red.fox.board.europa.economy']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['red.fox.board.europa.express']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['red.fox.board.north.america.africa']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['red.fox.board.south.america.asia']}  ${languageToCurrency[language]}`}
              </td>
              <td>
                {`${shippingPrices['red.fox.board.australia.oceania']}  ${languageToCurrency[language]}`}
              </td>
            </tr>
          </tbody>
        </Table>
      </ContentWrapper>
    </>
  );
}

export default Shipping;
