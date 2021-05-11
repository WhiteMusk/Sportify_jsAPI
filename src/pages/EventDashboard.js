import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import { makeStyles , useTheme } from '@material-ui/core/styles';
import { useState } from 'react'
import EventOverview from '../components/EventOverview';
import RegistrationStatus from '../components/RegistrationStatus';
import EventInfo from '../components/EventInfo';
import FormEdit from '../components/FormEdit';
import { FormattedMessage } from 'react-intl';
import Navbar from "../components/Navbar";
import { useMediaQuery } from 'react-responsive'
import EventTracking from "../components/EventTracking";
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { setLocale, logIn, logOut } from '../redux/actions';
import { LOCALE_OPTIONS } from '../i18n/locale-settings';
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InfoIcon from '@material-ui/icons/Info';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AppBar from '@material-ui/core/AppBar';
import { Link } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 120;
const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    container_mobile:{
       marginLeft:theme.spacing(13),
       marginRight:theme.spacing(10),
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
function EventDashboard(props) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1162px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const classes = useStyles();
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(3);
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

  const renderView = () => {
    switch(currentTab) {
      case 0:
        return <EventOverview eventID={props.match.params.eventID} />;
      case 1:
        return <EventInfo eventID={props.match.params.eventID} />;
      case 2:
        return <RegistrationStatus eventID={props.match.params.eventID} />;
      case 3:
        return <FormEdit eventID={props.match.params.eventID} />;
      case 4:
        return <EventTracking eventID={props.match.params.eventID} />;
      default:
        return <div>Something's wrong...</div>
    }
  }

    return (
        <div className={classes.root}>
        {!isTabletOrMobile?
        <>
        <Navbar/>
            <Drawer
                style={{ width: { drawerWidth }, flexShrink: 0 }}
                variant="permanent"
            >
                <Toolbar />
                <div>
                    <List>
                        {[<FormattedMessage id="eventDashBoard.overview" />, <FormattedMessage id="eventDashBoard.info" />, <FormattedMessage id="eventDashBoard.registration" />, <FormattedMessage id="eventDashBoard.editRegistration" />, <FormattedMessage id="eventDashBoard.progress" />].map((text, index) => (
                            <ListItem button key={text} onClick={() => handleTabClick(index)}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>

            <Container maxWidth="md" className={classes.container}>
              <Toolbar />
              {renderView()}
            </Container></>: <>
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
                        {[<FormattedMessage id="eventDashBoard.overview" />, <FormattedMessage id="eventDashBoard.info" />, <FormattedMessage id="eventDashBoard.registration" />, <FormattedMessage id="eventDashBoard.editRegistration" />, <FormattedMessage id="eventDashBoard.progress" />].map((text, index) => (
                            <ListItem button key={text} onClick={() => handleTabClick(index)}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
            </div>
          </Drawer>
          <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
             >
            <Container>
            <Toolbar />
            {renderView()}
            </Container>
            </main>
        </>
            }
        </div>
    );
}

export default EventDashboard;