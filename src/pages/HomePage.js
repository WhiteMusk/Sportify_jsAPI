import Typography from '@material-ui/core/Typography';
import EventCardList from "../components/EventCardList";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useQuery } from '@apollo/client';
import { AllEvents_QUERY } from '../graphql';

// const API_ROOT = 'http://localhost:5000/';
// const instance = axios.create({
//     baseURL: API_ROOT
// });

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    appBarSpacer: theme.mixins.toolbar,
}));

function HomePage() {
    const classes = useStyles();
    // const [eventList, setEventList] = useState([]);

    // const getAllEvent = async () => {
    //     const { data: events } = await instance.get('/events/eventList');
    //     setEventList(events);
    // }

    // useEffect(() => {
    //     if (!eventList.length)
    //         getAllEvent();
    // })

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
                </Typography> :
                <EventCardList eventList={data.allEvents} />}
        </Container>
    )
}

export default HomePage;