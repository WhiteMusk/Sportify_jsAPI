import NavBar from "../components/NavBar";
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react'
import EventOverview from '../components/EventOverview';
import RegistrationStatus from '../components/RegistrationStatus';
import EventInfo from '../components/EventInfo';
import OrganizerInfo from '../components/OrganizerInfo';
import { FormattedMessage } from 'react-intl';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

function EventDashboard() {
    const classes = useStyles();
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabClick = (index) => {
        setCurrentTab(index);
    }

    return (
        <>
            <NavBar />

            <Drawer
                style={{ width: { drawerWidth }, flexShrink: 0 }}
                variant="permanent"
            >
                <Toolbar />
                <div>
                    <List>
                        {[<FormattedMessage id="eventDashBoard.overview" />, <FormattedMessage id="eventDashBoard.info" />, <FormattedMessage id="eventDashBoard.registration" />, <FormattedMessage id="eventDashBoard.progress" />].map((text, index) => (
                            <ListItem button key={text} onClick={() => handleTabClick(index)}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>

            <Container maxWidth="md" className={classes.container}>
                <Toolbar />
                {currentTab === 0 ? <EventOverview /> :
                    (currentTab === 1 ? <EventInfo /> :
                        (currentTab === 2 ? <RegistrationStatus /> : <OrganizerInfo />))
                }
            </Container>
        </>
    );
}

export default EventDashboard;