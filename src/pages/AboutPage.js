import Typography from '@material-ui/core/Typography';
import EventCardList from "../components/EventCardList";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

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
        <Container maxWidth="md" className={classes.container}>
            <div className={classes.appBarSpacer} />
            <Typography gutterBottom variant="h5" component="h2">
                <FormattedMessage id="aboutPage.title" />
            </Typography>
            <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
        </Container>
    )
}

export default AboutPage;