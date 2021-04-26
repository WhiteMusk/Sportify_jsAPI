import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from "react-redux";
import { IntlProvider } from 'react-intl';

import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import EventRegistration from "./pages/EventRegistration";
import EventManagement from "./pages/EventManagement";
import EventDashboard from "./pages/EventDashboard";

import { getLocaleMessages } from './i18n/locale-settings';

function App () {
  const locale = useSelector(state => state.locale.locale);
  const messages = getLocaleMessages(locale);

  return (
    <IntlProvider locale={locale} key={locale} messages={messages}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/event/:eventID?" component={EventPage} />
          <Route exact path="/event/:eventID?/register/" component={EventRegistration} />
          <Route exact path="/manage/all" component={EventManagement} />
          <Route exact path="/manage/:eventID?" component={EventDashboard} />
        </Switch>
      </Router>
    </IntlProvider>
  );
}

export default App;