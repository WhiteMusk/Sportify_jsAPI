import Typography from '@material-ui/core/Typography';

function EventDescription(props) {
    return (
        <Typography paragraph>
            <Typography variant="h4">{props.info.title}</Typography>
            {"日期： " + props.info.date.slice(0, 10)}<br />
            {"地點： " + props.info.location}<br />
          說明：<br />
            {props.info.description}
        </Typography>
    )
}

export default EventDescription;