import React, { Component } from "react";
import { BrowserRouter } from 'react-router-dom';
import HomePage from './page/HomePage';
import Sportify from "./page/Sportify";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Sportify />
      </BrowserRouter>
    );
  }
}