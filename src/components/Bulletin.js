import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Box } from '@material-ui/core'
import Link from '@material-ui/core/Link';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import black from '@material-ui/core/colors';
import ExpansionPanelSummary from '@material-ui/core/AccordionSummary';
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  summary: {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  root: {
    color: 'white',
    backgroundColor: "#212121",
    marginTop: theme.spacing(6),
    borderRadius: 20
  },
  mainFeaturedPost: {
    position: 'relative',
    height: 500,
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    // marginTop: theme.spacing(6),
    backgroundImage: 'url(https://www.perfect-tennis.com/wp-content/uploads/2019/10/atp-finals-prize-money.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));


function Bulletin(props) {
  var items = props.eventList
  return (
    <Carousel autoPlay={false}>

      {
        items.map((item, i) => <Item key={i} item={item} />)
      }
    </Carousel>
  )
}

function Item(props) {
  const classes = useStyles();
  // console.log(props)
  return (
    <Paper className={classes.mainFeaturedPost} >
      {/* Increase the priority of the hero background image */}
      {/* {<img style={{ display: 'none' }} src={props.item.img} />} */}
      <div className={classes.overlay} />
      {/* <Grid container> */}
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {props.item.title}
            </Typography>
            <Box classes={classes.summary}>
              <Typography variant="h5" color="inherit" noWrap displayBlock>
                {props.item.description}
              </Typography>
            </Box >
            <Link variant="subtitle1" href="#">
              <Button className={classes.root} variant='outlined' component={NavLink} to={"/event/" + props.item._id} startIcon={<SportsTennisIcon />}>Register Now</Button>
            </Link>
          </div>
        </Grid>
      {/* </Grid> */}
    </Paper>
  )
}
export default Bulletin;