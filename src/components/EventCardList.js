import React from "react";
import Grid from '@material-ui/core/Grid';
import EventCard from "./EventCard";

export default class EventCardList extends React.Component {
  render() {    
    return ( 
      <Grid container spacing={3}>
        <Grid item sm={6} md={4}>
          <EventCard />
        </Grid>
        <Grid item sm={6} md={4}>
          <EventCard />
        </Grid>
        <Grid item sm={6} md={4}>
          <EventCard />
        </Grid>
      <Grid item sm={6} md={4}>
          <EventCard />
        </Grid>
        <Grid item sm={6} md={4}>
          <EventCard />
        </Grid>
        <Grid item sm={6} md={4}>
          <EventCard />
        </Grid>
      <Grid item sm={6} md={4}>
          <EventCard />
        </Grid>
        <Grid item sm={6} md={4}>
          <EventCard />
        </Grid>
        <Grid item sm={6} md={4}>
          <EventCard />
        </Grid>
      </Grid>
    );
  }
}
