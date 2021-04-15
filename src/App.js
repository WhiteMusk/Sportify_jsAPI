import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import EventRegistration from "./pages/EventRegistration";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/event/:eventID?" component={EventPage} />
        <Route exact path="/event/:eventID/register/" component={EventRegistration} />
      </Router>
    );
  }
}