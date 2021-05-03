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
          image="https://www.eventpal.com.tw/573a50d7-122f-4d23-9c9a-525ba403732e/1.jpg"
          title={event.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {event.title}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            {"活動日期： " + event.date.slice(0, 10)}<br />
            {"集合地點： " + event.location}
          </Typography> */}
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