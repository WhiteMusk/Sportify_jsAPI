import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from "react-intl";
import { useQuery } from '@apollo/client';
import { Host_QUERY } from '../graphql';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
var HtmlToReactParser = require('html-to-react').Parser;
var htmlToReactParser = new HtmlToReactParser();

const useStyles = makeStyles((theme) => ({
    root:{
        color:'white',
        backgroundColor:"#212121",
        marginBottom: theme.spacing(2),
        borderRadius: 20
    },
    title: {
        marginBottom: "30px",
    },
}));

function EventDescription({ info, tab ,eventID}) {
    const classes = useStyles();

    const { loading, error, data } = useQuery(Host_QUERY, { variables: { host_id: info.host_id } });
    if (error) console.log(error.networkError.result.errors);

    return (
        <>
            {tab === 0 ?
                <>
                <div>
                    <Typography variant="h4" className={classes.title}>{info.title}</Typography>
                    <Button className={classes.root} variant='outlined' component={Link} to={"/event/" + eventID + "/register/"}  >Register</Button>
                    </div>
                    <Typography paragraph>
                        {"日期： " + info.date.slice(0, 10)}<br />
                        {"地點： " + info.location}<br />
                        說明：<br />
                    </Typography>
                    {htmlToReactParser.parse(info.description)}
                </>
                :
                (tab === 1 ?
                    <>
                        <Typography variant="h4" className={classes.title}>報名資訊</Typography>
                        {htmlToReactParser.parse(info.registrationInfo)}
                    </>
                    :
                    (tab === 2 ?
                        <>
                            <Typography variant="h4" className={classes.title}>交通資訊</Typography>
                            {htmlToReactParser.parse(info.trafficInfo)}
                        </>
                        :
                        (tab === 3 ?
                            <>
                                <Typography variant="h4" className={classes.title}>獎項</Typography>
                                {htmlToReactParser.parse(info.prize)}
                            </>
                            :
                            <>
                                <Typography variant="h4" className={classes.title}>聯絡主辦</Typography>

                                {loading ?
                                    <Typography><FormattedMessage id="loading" /></Typography> :
                                    <Typography paragraph>
                                        {"主辦單位： " + (data !== undefined ? data.host.name : "未提供")}<br />
                                        {"連絡電話： " + (data !== undefined ? data.host.phone : "未提供")}<br />
                                        {"連絡信箱： " + (data !== undefined ? data.host.email : "未提供")}<br />
                                        {"官方網站/粉絲頁： " + (data !== undefined ? data.host.page : "未提供")}<br />
                                    </Typography>
                                }
                            </>)))}
        </>
    )
}

export default EventDescription;