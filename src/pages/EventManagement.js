import React from "react";
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import EventDescription from '../components/EventDescription';
import Navbar from "../components/Navbar";
import { FormattedMessage } from "react-intl";
import EventStatusTable from "../components/EventStatusTable";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function EventManagement(props) {
  const classes = useStyles();

  return (
    <>
      <Navbar />

      <Container maxWidth="md" className={classes.container}>
        <Toolbar />


        <EventStatusTable />
      </Container>
    </>
  );
}

export default EventManagement;