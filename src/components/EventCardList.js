import React from "react";
import Grid from '@material-ui/core/Grid';
import EventCard from "./EventCard";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function EventCardList() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
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
    </Container>
  );
}

export default EventCardList;
