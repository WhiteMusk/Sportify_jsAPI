import Typography from '@material-ui/core/Typography';
import EventCardList from "../components/EventCardList";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        marginTop: "50px"
    },
}));

function HomePage() {
    const classes = useStyles();

    return (
        <Container maxWidth="md" className={classes.container}>
            <Typography gutterBottom variant="h5" component="h2">所有賽事</Typography>
            <EventCardList />
        </Container>
    )
}

export default HomePage;