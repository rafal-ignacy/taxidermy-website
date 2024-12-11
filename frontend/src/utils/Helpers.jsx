import { useState, useEffect } from 'react';

import translationFile from '@data/translations.json'


function useWindowsWidth() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

  return [windowWidth];
};

function translation(languageCode, key) {
  if (languageCode !== undefined && key !== undefined) {
    if (translationFile[languageCode] && translationFile[languageCode][key]) {
      return translationFile[languageCode][key]; 
    } else {
      return `${languageCode}.${key}`;
    }
  } else {
    return `${languageCode}.${key}`;
  }
}

async function exchangeRate(currency) {
  if (currency === 'EUR') {
    return 1;
  } else {
    try {
      const response = await fetch('https://latest.currency-api.pages.dev/v1/currencies/eur.json');
      const data = await response.json();
      if (data.eur[currency.toLowerCase()]) {
        return data.eur[currency.toLowerCase()];
      } else {
        throw new Error('Could not find currency');
      }
    } catch (error) {
      console.error('Request error:', error);
      return null;
    }
  }
}

export { useWindowsWidth, translation, exchangeRate };