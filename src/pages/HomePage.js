import Typography from '@material-ui/core/Typography';
import EventCardList from "../components/EventCardList";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_EVENTS_QUERY } from '../graphql';
import NavbarH from "../components/NavbarH";
import Bulletin from '../components/Bulletin'
import Divider from '@material-ui/core/Divider'
import Filter from '../components/Filter'
import Footer from '../components/Footer'
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    appBarSpacer: theme.mixins.toolbar,
    divider: {
        marginTop: theme.spacing(4),
    },
    divider2: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    }
}));

function HomePage() {
    const classes = useStyles();
    const { loading, error, data, refetch } = useQuery
        (GET_EVENTS_QUERY);
    const [eventList, setEventList] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [Region, setRegion] = useState('');
    const [Level, setLevel] = useState('');
    const [date, setDate] = useState([])
    if (error) console.log(error);
    if (!eventList.length && data) {
        setEventList(data.getEvents);
    }
    const onSearchChange = (event) => {
        setSearchField(event.target.value)
    }
    const onRegionChange = (event) => {
        setRegion(event.target.value)
    }
    const onLevelChange = (event) => {
        setLevel(event.target.value)
    }
    const onDateChange = (value) => {
        setDate(value)
    }
    const searchEventList1 = eventList.filter(event => {
        if (!date || !date.length) { return true }
        else if (!event.date) { return false }
        else {
            var time = event.date;
            if (event.date.length > 10) {
                var time = moment(new Date(parseInt(event.date))).format('YYYY-MM-DD');
            }
            console.log(time);
            if (date[0].isAfter(time) || date[1].isBefore(time)) {
                return false
            }
            else {
                return true
            }
        }
    })


    const searchEventList = searchEventList1.length ? searchEventList1.filter(event => {
        if (!event.region || !event.level) {
            return false;
        }
        else {
            return (event.title.includes(searchField) ||
                event.location.includes(searchField)) &&
                (event.region.includes(Region) &&
                    event.level.includes(Level))
        }
    }) : searchEventList1

    useEffect(() => {
        refetch();
    }, [data]);

    return (
        <>
            <NavbarH searchChange={onSearchChange} />
            <Container maxWidth="md" className={classes.container}>
                <div className={classes.appBarSpacer} />
                {data ?
                    <>
                        <Bulletin eventList={data.getEvents} />
                        <Divider variant='middle' className={classes.divider} />

                        <Filter
                            value={date}
                            DateChange={onDateChange}
                            RegionChange={onRegionChange}
                            LevelChange={onLevelChange} />
                        <Divider variant='middle' className={classes.divider2} />
                        <Typography gutterBottom variant="h5" component="h2">
                            <FormattedMessage id="homePage.allEvents" />
                        </Typography>
                    </>
                    : <></>
                }

                {loading ?
                    <Typography>
                        <FormattedMessage id="loading" />
                    </Typography> : (
                        data ? (searchEventList.length ?
                            <EventCardList events={searchEventList} /> :
                            <Typography>
                                <FormattedMessage id="No Result" />
                            </Typography>
                        )
                            :
                            <Typography>
                                Cannot connect to server.
                    </Typography>)
                }
            </Container>
            <Divider />
            <Footer />
        </>
    )
}

export default HomePage;