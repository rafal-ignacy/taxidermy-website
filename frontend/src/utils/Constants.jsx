export const languageToCurrency = {
  'en-GB': 'GBP',
  'de-DE': 'EUR',
  'en-US': 'USD',
  'pl-PL': 'PLN',
};

export const availableLanguages = {
  'en-GB': ['de-DE', 'en-US', 'pl-PL'],
  'de-DE': ['en-GB', 'en-US', 'pl-PL'],
  'en-US': ['en-GB', 'de-DE', 'pl-PL'],
  'pl-PL': ['en-GB', 'de-DE', 'en-US'],
};

export const handledRequestStatuses = [200, 400, 404, 408, 413, 429, 500];
export const contactFormURL = 'https://taxidermypoland.com:3000/contact-form';