import React from "react";
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import EventStatusTable from "../components/EventStatusTable";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function EventManagement() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Toolbar />

      <EventStatusTable />
    </Container>
  );
}

export default EventManagement;