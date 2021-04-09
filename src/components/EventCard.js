import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class EventCard extends React.Component {
  render() {
    return ( 
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image="https://www.eventpal.com.tw/573a50d7-122f-4d23-9c9a-525ba403732e/1.jpg"
            title="2021 山道王-塔塔加挑戰賽"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              2021 山道王-塔塔加挑戰賽
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              活動日期：2021-08-01 (日)<br />
              報名截止：2021-06-14 (一)<br />
              集合地點：南投水里商工
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            分享
          </Button>
          <Button size="small" color="primary">
            更多資訊
          </Button>
        </CardActions>
      </Card>
    );
  }
}
