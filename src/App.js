import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import './App.css';
import NavBar from "./components/NavBar";
import EventCardList from "./components/EventCardList";
import EventInfo from "./components/EventInfo";

export default class App extends Component {
  render() {
    return ( 
      <div className="app">
        <NavBar />
        <div className="content">
{/*
          <div className="event-list">
            <Typography gutterBottom variant="h5" component="h2">所有賽事</Typography>
            <EventCardList />
          </div>*/}
          <EventInfo />
{/*//          <EventInfo />*/}
        </div>
      </div>
    );
  }
}