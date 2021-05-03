import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from "./redux/store";
import App from './App';
import './css/App.css';

require('dotenv').config({ path: `${__dirname}/../.env` });

const port = process.env.SERVER_PORT || 5000;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `http://localhost:${port}/`
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <Router>
            <App />
          </Router>
        </PersistGate>
      </ReduxProvider>
    </ApolloProvider>
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
