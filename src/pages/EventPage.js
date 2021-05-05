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
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import EventDescription from '../components/EventDescription';
import { useQuery } from '@apollo/client';
import { FormattedMessage } from "react-intl";
import { GET_EVENT_QUERY } from '../graphql';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setLocale, logIn, logOut } from '../redux/actions';
import { LOCALE_OPTIONS } from '../i18n/locale-settings';
import { useMediaQuery } from 'react-responsive'
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InfoIcon from '@material-ui/icons/Info';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Navbar from "../components/Navbar";

const drawerWidth = 120;
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  root: {
    display: 'flex',
    padding: theme.spacing(1),
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function EventInfo(props) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const classes = useStyles();
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(0);
  const [open, setOpen] = useState(false);
  // const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const userData = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();
  const handleTabClick = (index) => {
    setCurrentTab(index);
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };


  const { loading, error, data } = useQuery(GET_EVENT_QUERY, {
    variables: { eventId: props.match.params.eventID }
  });
  // if (error) console.log(error);
  if (error) console.log(error.networkError.result.errors);


  return (
    <div className={classes.root}>
      {!isTabletOrMobile ?
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
        </> :
        <>
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar className={classes.root}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <IconButton color="inherit" component={Link} to="/">
                <SportsTennisIcon />
              </IconButton>
              {/* Show ManageEvents link if user is logged in, else show Services link */
                userData ?
                  <IconButton color="inherit" component={Link} to={`/manage/${userData.profile._id}/all`}>
                    <DashboardIcon />
                  </IconButton> :
                  <IconButton color="inherit" component={Link} to="/about">
                    <InfoIcon />
                  </IconButton>
              }
              <div style={{ flexGrow: 1 }}></div>
              <IconButton size='small' color="inherit" onClick={() => dispatch(setLocale(LOCALE_OPTIONS.zh))}>CH</IconButton>
              <IconButton size='small' color="inherit" onClick={() => dispatch(setLocale(LOCALE_OPTIONS.en))}>EN</IconButton>
              {/* Show log out button if user is currently logged in, and vice versa */
                userData ?
                  <>
                    <IconButton color="inherit" component={Link} to={`/manage/${userData.profile._id}/organizerInfo`}>
                      <ContactMailIcon />
                    </IconButton>
                    <IconButton size='small' color="inherit" component={Link} to="/" onClick={() => dispatch(logOut())}>
                      <ExitToAppIcon />
                    </IconButton>
                  </>
                  :
                  <IconButton size='small' color="inherit" component={Link} to="/auth">
                    <FormattedMessage id="login" />
                  </IconButton>
              }
            </Toolbar>
          </AppBar>

          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
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
        </>
      }
      {!isTabletOrMobile ?
        <Container maxWidth="md" className={`display-ckeditor ${classes.container}`}>
          <Toolbar />
          {loading ?
            <Typography><FormattedMessage id="loading" /></Typography> :
            <EventDescription info={data.getEvent} tab={currentTab} eventID={props.match.params.eventID} />}
        </Container>
        :
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >

          <div className={classes.drawerHeader} />
          <Toolbar />
          {/* <Container maxWidth="md" className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
        <Toolbar /> */}
          {loading ?
            <Typography><FormattedMessage id="loading" /></Typography> :
            <EventDescription info={data.getEvent} tab={currentTab} eventID={props.match.params.eventID} />}
          {/* </Container> */}
        </main>
      }
    </div>
  );
}

export default EventInfo;