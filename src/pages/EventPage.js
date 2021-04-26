import React from "react";
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import EventDescription from '../components/EventDescription';
import Navbar from "../components/Navbar";
import { FormattedMessage } from "react-intl";

const API_ROOT = 'http://localhost:5000/';
const instance = axios.create({
  baseURL: API_ROOT
});

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function EventInfo(props) {
  const classes = useStyles();
  const [eventInfo, setEventInfo] = useState([]);

  const getEventInfo = async (id) => {
    const { data: info } = await instance.get('/events/eventInfo', { params: { id } });
    setEventInfo(info);
  }

  useEffect(() => {
    getEventInfo(props.match.params.eventID);
  },
    [props.match.params.eventID]
  )

  return (
    <>
      <Navbar />

      <Drawer
        style={{ width: { drawerWidth }, flexShrink: 0 }}
        variant="permanent"
      >
        <Toolbar />
        <div>
          <List>
            {[<FormattedMessage id="eventPage.regulations" />, '報名資訊', '交通資訊', '獎項'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['聯絡主辦', '線上報名'].map((text, index) => (
              index === 0 ?
                (<ListItem button key={text}
                >
                  <ListItemText primary={text} />
                </ListItem>) :
                (<ListItem button key={text}
                  component={Link} to={"/event/" + props.match.params.eventID + "/register/"}
                >
                  <ListItemText primary={text} />
                </ListItem>)
            ))}
          </List>
        </div>
      </Drawer>
      <Container maxWidth="md" className={classes.container}>
        <Toolbar />
        {!eventInfo.length ?
          <Typography><FormattedMessage id="loading"/></Typography> :
          <EventDescription info={eventInfo[0]} />}
      </Container>
    </>
  );
}

export default EventInfo;