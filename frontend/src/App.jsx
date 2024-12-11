import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState, createContext } from 'react';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie';
import Home from '@pages/Home';
import Product from '@pages/Product';
import AboutMe from '@pages/AboutMe';
import PurchasePayment from '@pages/PurchasePayment';
import Shipping from '@pages/Shipping';
import Contact from '@pages/Contact';
import NotFound from '@pages/NotFound';

export const LanguageContext = createContext();

function App() {
  const [language, setLanguage] = useState(Cookies.get('language') || 'en-GB');
  return (
    <>
      <Helmet htmlAttributes={{ lang: language }} />
      <RouterProvider
        router={createBrowserRouter([
          {
            path: '/',
            element: (
              <LanguageContext.Provider value={{ language, setLanguage }}>
                <Home />
              </LanguageContext.Provider>
            ),
            errorElement: (
              <LanguageContext.Provider value={{ language, setLanguage }}>
                <NotFound />
              </LanguageContext.Provider>
            ),
          },
          {
            path: '/products/roe-deer',
            element: (
              <LanguageContext.Provider value={{ language, setLanguage }}>
                <Product category="roeDeer" />
              </LanguageContext.Provider>
            ),
          },
          {
            path: '/products/wild-boar',
            element: (
              <LanguageContext.Provider value={{ language, setLanguage }}>
                <Product category="wildBoar" />
              </LanguageContext.Provider>
            ),
          },
          {
            path: '/products/predators',
            element: (
              <LanguageContext.Provider value={{ language, setLanguage }}>
                <Product category="predators" />
              </LanguageContext.Provider>
            ),
          },
          {
            path: '/products/red-deer',
            element: (
              <LanguageContext.Provider value={{ language, setLanguage }}>
                <Product category="redDeer" />
              </LanguageContext.Provider>
            ),
          },
          {
            path: '/products/skins',
            element: (
              <LanguageContext.Provider value={{ language, setLanguage }}>
                <Product category="skins" />
              </LanguageContext.Provider>
            ),
          },
          {
            path: '/products/others',
            element: (
              <LanguageContext.Provider value={{ language, setLanguage }}>
                <Product category="others" />
              </LanguageContext.Provider>
            ),
          },
          {
            path: '/about-me',
            element: (
              <LanguageContext.Provider value={{ language, setLanguage }}>
                <AboutMe />
              </LanguageContext.Provider>
            ),
          },
          {
            path: '/purchase-payment',
            element: (
              <LanguageContext.Provider value={{ language, setLanguage }}>
                <PurchasePayment />
              </LanguageContext.Provider>
            ),
          },
          {
            path: '/shipping',
            element: (
              <LanguageContext.Provider value={{ language, setLanguage }}>
                <Shipping />
              </LanguageContext.Provider>
            ),
          },
          {
            path: '/contact',
            element: (
              <LanguageContext.Provider value={{ language, setLanguage }}>
                <Contact />
              </LanguageContext.Provider>
            ),
          },
          {
            path: '*',
            element: (
              <LanguageContext.Provider value={{ language, setLanguage }}>
                <NotFound />
              </LanguageContext.Provider>
            ),
          },
        ])}
      />
    </>
  );
}

export default App;
