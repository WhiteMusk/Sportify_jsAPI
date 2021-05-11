import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import Navbar from "../components/Navbar";
const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    appBarSpacer: theme.mixins.toolbar,
}));

function AboutPage() {
    const classes = useStyles();

    return (
        <>
        <Navbar/>
        <Container maxWidth="md" className={classes.container}>
            <div className={classes.appBarSpacer} />
            <Typography gutterBottom variant="h5" component="h2">
                <FormattedMessage id="aboutPage.title" />
            </Typography>
            <Typography>
            Sportify is a website designed for sports event registration, aggregation, and supports online payment service as well as event progress tracking. The origin of Sportify is a simple idea to have more sport events to join. Now, we implement the idea through sportify and we kindly invite you to join us. With your participating, sport events will be more fun. Click a event card and start your journey here!
            </Typography>
        </Container>
        </>
    )
}

export default AboutPage;