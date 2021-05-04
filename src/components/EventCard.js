import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <Card>
      <CardActionArea
        component={Link} to={"/event/" + event._id}
      >
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="https://yt3.ggpht.com/ytc/AAUvwnjO2_Wkoejhofk003Y3YcS09G0-JyrbQM8ybTIikw=s900-c-k-c0x00ffffff-no-rj"
          title={event.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {event.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {event.date == null ? "活動日期： null" : (event.dateEnd == null ? "活動日期： " + event.date.slice(0, 10) :
              "活動日期： " + event.date.slice(0, 10) + "~" + event.dateEnd.slice(0, 10))}<br />
            {"集合地點： " + event.location}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          分享
          </Button>
        <Button
          size="small" color="primary"
          component={Link} to={"/event/" + event._id}
        >
          更多資訊
          </Button>
      </CardActions>
    </Card>
  );
}

export default EventCard;