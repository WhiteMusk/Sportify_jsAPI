import Typography from '@material-ui/core/Typography';
import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: "30px",
    },
}));

function EventDescription({ info }) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography variant="h4" className={classes.title}>{info.title}</Typography>
            <Typography paragraph>
                {"日期： " + info.date.slice(0, 10)}<br />
                {"地點： " + info.location}<br />
          說明：<br />
                {info.description}
            </Typography>
        </React.Fragment>
    )
}

export default EventDescription;