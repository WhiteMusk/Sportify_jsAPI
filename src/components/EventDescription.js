import Typography from '@material-ui/core/Typography';
import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: "30px",
    },
}));

function EventDescription(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography variant="h4" className={classes.title}>{props.info.title}</Typography>
            <Typography paragraph>
                {"日期： " + props.info.date.slice(0, 10)}<br />
                {"地點： " + props.info.location}<br />
          說明：<br />
                {props.info.description}
            </Typography>
        </React.Fragment>
    )
}

export default EventDescription;