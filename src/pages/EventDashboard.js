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
import { FormattedMessage } from 'react-intl';
import Navbar from "../components/Navbar";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

function EventDashboard(props) {
    const classes = useStyles();
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabClick = (index) => {
        setCurrentTab(index);
    }

    return (
        <>
        <Navbar/>
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
                {currentTab === 0 ? <EventOverview eventID={props.match.params.eventID} /> :
                    (currentTab === 1 ? <EventInfo eventID={props.match.params.eventID} /> :
                        (currentTab === 2 ? <RegistrationStatus eventID={props.match.params.eventID} /> : <></>))
                }
            </Container>
        </>
    );
}

export default EventDashboard;