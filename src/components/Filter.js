import React from 'react';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box"
import MenuItem from '@material-ui/core/MenuItem';
// import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Typography, AppBar, Toolbar,Button} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import DateRange from './DateRange';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
    container: {
      paddingTop: theme.spacing(4),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    },
    paper:{
      padding: theme.spacing(2),
    },
    icon:{
      paddingTop: theme.spacing(2),
    },
    
  }));
function Filter(props) {
    const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.container} container justify='flex' >
      <Grid item xs={2}>
      <Typography ><FilterListIcon className={classes.icon} fontSize='large'/> Filter</Typography>
      </Grid>
      {/* <Grid item xs={1}>
      
      </Grid> */}
        <Grid item xs={3} justify="center">
        <InputLabel >Date</InputLabel>
        <DateRange value={props.value} DateChange ={props.DateChange}/>
        </Grid>
        <Grid item xs={1}>
      
      </Grid>
        <Grid item xs={2} justify="center">
        <InputLabel >Location</InputLabel>
        <Select 
        onChange={props.RegionChange}
        style={{width: 120}}>
          <MenuItem value={""}>無</MenuItem>
          <MenuItem value={"北部"}>北部</MenuItem>
          <MenuItem value={"中部"}>中部</MenuItem>
          <MenuItem value={"南部"}>南部</MenuItem>
        </Select >
        </Grid>
        <Grid item xs={1}>
      
      </Grid>
        <Grid item xs={3} justify="center">
        <div justify="center">
        <InputLabel >Level</InputLabel>
        <Select 
        onChange={props.LevelChange} 
        style={{width: 120}}>
          <MenuItem value={""}>無</MenuItem>
          <MenuItem value={"2.0"}>2.0</MenuItem>
          <MenuItem value={"2.5"}>2.5</MenuItem>
          <MenuItem value={"3.0"}>3.0</MenuItem>
          <MenuItem value={"3.5"}>3.5</MenuItem>
          <MenuItem value={"4.0"}>4.0</MenuItem>
          <MenuItem value={"5.0"}>5.0</MenuItem>


        </Select >
        </div>
        </Grid>
      </Grid>
      
    </div>
  );
}
export default Filter;