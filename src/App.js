import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from "react-redux";
import { IntlProvider } from 'react-intl';

import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import EventRegistration from "./pages/EventRegistration";

function App () {
  const locale = useSelector(state => state.locale);

  return (
    <IntlProvider locale={locale.locale} key={locale.locale} messages={locale.messages}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/event/:eventID?" component={EventPage} />
          <Route exact path="/event/:eventID/register/" component={EventRegistration} />
        </Switch>
      </Router>
    // </IntlProvider>
  );
}

export default App;