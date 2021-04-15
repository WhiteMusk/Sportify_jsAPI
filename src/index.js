import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { IntlProvider } from 'react-intl';
import en from './i18n/en.js';
import zh from './i18n/zh.js';

import App from './App';
//import reportWebVitals from './reportWebVitals';

const Root = () => {
  const [locale, setLocale] = useState(navigator.language);
  let messages = locale.includes('zh') ? zh : en;

  return (
    <IntlProvider locale={locale} key={locale} defaultLocale="en" messages={messages}>
      <App setLocale={setLocale}/>
    </IntlProvider>
  )
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
