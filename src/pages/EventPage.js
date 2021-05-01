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
import { useEffect, useState } from 'react';
import EventDescription from '../components/EventDescription';
import { useQuery } from '@apollo/client';
import { FormattedMessage } from "react-intl";

import { GET_EVENT_QUERY } from '../graphql';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function EventInfo(props) {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabClick = (index) => {
    setCurrentTab(index);
  }

  const { loading, error, data } = useQuery(GET_EVENT_QUERY, {
    variables: { eventId: props.match.params.eventID }
  });
  // if (error) console.log(error);
  if (error) console.log(error.networkError.result.errors);

  return (
    <>
      <Drawer
        style={{ width: { drawerWidth }, flexShrink: 0 }}
        variant="permanent"
      >
        <Toolbar />
        <div>
          <List>
            {[<FormattedMessage id="eventPage.regulations" />, '報名資訊', '交通資訊', '獎項'].map((text, index) => (
              <ListItem button key={text} onClick={() => handleTabClick(index)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['聯絡主辦', '線上報名'].map((text, index) => (
              index === 0 ?
                (<ListItem button key={text} onClick={() => handleTabClick(index + 4)}
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
        {loading ?
          <Typography><FormattedMessage id="loading" /></Typography> :
          <EventDescription info={data.getEvent} tab={currentTab} />}
      </Container>
    </>
  );
}

export default EventInfo;