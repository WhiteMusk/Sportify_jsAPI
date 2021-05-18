import React from "react";
import { Route, Switch } from 'react-router-dom';
import { useSelector } from "react-redux";
import { IntlProvider } from 'react-intl';

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AuthPage from "./pages/AuthPage";
import EventPage from "./pages/EventPage";
import EventRegistration from "./pages/EventRegistration";
import EventManagement from "./pages/EventManagement";
import EventDashboard from "./pages/EventDashboard";
import OranizerInfo from "./pages/OrganizerInfo";
import ContactUs from './pages/ContactUs'
import { getLocaleMessages } from './i18n/locale-settings';

import Payment from './components/aio_check_out_all'

function App () {
  const locale = useSelector(state => state.locale.locale);
  const messages = getLocaleMessages(locale);

  return (
    <IntlProvider locale={locale} key={locale} messages={messages}>
      {/* <Navbar /> */}
      <Switch>
        <Route exact path="/"><HomePage /></Route>
        <Route exact path="/about"><AboutPage /></Route>
        <Route exact path="/contact"><ContactUs/></Route>
        <Route exact path="/event/:eventID?" component={EventPage}></Route>
        <Route exact path="/event/:eventID?/register/" component={EventRegistration}></Route>
        <Route exact path="/auth"><AuthPage /></Route>
        <Route exact path="/manage/:hostID?/all" component={EventManagement}></Route>
        <Route exact path="/manage/:hostID?/organizerInfo" component={OranizerInfo}></Route>
        <Route exact path="/manage/:hostID?/:eventID?" component={EventDashboard}></Route>
        <Route exact path="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5" component={Payment}></Route>
      </Switch>
    </IntlProvider>
  );
}

export default App;