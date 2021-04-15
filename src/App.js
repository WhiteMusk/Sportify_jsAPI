import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import EventRegistration from "./pages/EventRegistration";

function App ({ setLocale }) {
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={HomePage} /> */}
        <Route exact path="/" render={(props) => (
          <HomePage {...props} setLocale={setLocale}/>
        )} />
        <Route exact path="/event/:eventID?" component={EventPage} />
        <Route exact path="/event/:eventID/register/" component={EventRegistration} />
      </Switch>
    </Router>
  );
}

export default App;