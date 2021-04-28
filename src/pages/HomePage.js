import Typography from '@material-ui/core/Typography';
import EventCardList from "../components/EventCardList";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useQuery } from '@apollo/client';
import { AllEvents_QUERY } from '../graphql';


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    appBarSpacer: theme.mixins.toolbar,
}));

function HomePage() {
    const classes = useStyles();
    const { loading, error, data } = useQuery(AllEvents_QUERY);
    if (error) console.log(error);

    return (
        <Container maxWidth="md" className={classes.container}>
            <div className={classes.appBarSpacer} />
            <Typography gutterBottom variant="h5" component="h2">
                <FormattedMessage id="homePage.allEvents" />
            </Typography>
            {loading ?
                <Typography>
                    <FormattedMessage id="loading"/>
                </Typography> : (
                data ? 
                    <EventCardList eventList={data.allEvents} /> :
                    <Typography>
                        Cannot connect to server.
                    </Typography>)
            }
        </Container>
    )
}

export default HomePage;