import NavBar from "../components/NavBar";
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import EventOverview from '../components/EventOverview';
import RegistrationStatus from '../components/RegistrationStatus';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

function EventDashboard() {
    const classes = useStyles();

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
                        {['總覽', '賽事資訊', '報名狀況', '賽事進度'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>

            <Container maxWidth="md" className={classes.container}>
                <Toolbar />
                <RegistrationStatus />
            </Container>
        </>
    );
}

export default EventDashboard;