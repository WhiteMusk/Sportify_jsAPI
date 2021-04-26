import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from "react-redux";
import { IntlProvider } from 'react-intl';

import Navbar from "./components/Navbar";
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
        <Navbar />
        <Switch>
          <Route exact path="/"><HomePage /></Route>
          <Route exact path="/event/:eventID?"><EventPage /></Route>
          <Route exact path="/event/:eventID?/register/"><EventRegistration /></Route>
          <Route exact path="/manage/all"><EventManagement /></Route>
          <Route exact path="/manage/:eventID?"><EventDashboard /></Route>
        </Switch>
      </Router>
    </IntlProvider>
  );
}

export default App;