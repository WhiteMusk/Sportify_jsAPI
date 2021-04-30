import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from "react-intl";
import { useQuery } from '@apollo/client';
import { Host_QUERY } from '../graphql';
var HtmlToReactParser = require('html-to-react').Parser;
var htmlToReactParser = new HtmlToReactParser();

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: "30px",
    },
}));

function EventDescription({ info, tab }) {
    const classes = useStyles();

    const { loading, error, data } = useQuery(Host_QUERY, { variables: { host_id: info.host_id } });
    if (error) console.log(error);

    return (
        <>
            {tab === 0 ?
                <>
                    <Typography variant="h4" className={classes.title}>{info.title}</Typography>
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
                                        {"主辦單位： " + data.host.name}<br />
                                        {"連絡電話： " + data.host.phone}<br />
                                        {"連絡信箱： " + data.host.email}<br />
                                        {"官方網站/粉絲頁： " + data.host.page}<br />
                                    </Typography>
                                }
                            </>)))}
        </>
    )
}

export default EventDescription;