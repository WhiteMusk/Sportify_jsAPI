import { useQuery } from '@apollo/client';
import { Host_EventOverview_QUERY } from '../graphql';

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';

const useStyles_table = makeStyles({
  table: {
    minWidth: 650,
  },
});

const useStyles_typo = makeStyles((theme) => ({
    root:{
        color:'white',
        backgroundColor:"#212121",
        marginBottom: theme.spacing(2),
        borderRadius: 10
    },
    title: {
        marginTop: "30px",
        marginBottom: "30px",
    },
}));

function EventTrackingView(props) {

    const { loading, error, data } = useQuery(Host_EventOverview_QUERY, { variables: { eventId: props.eventID } });
    // if (error) console.log(error);
    if (error) console.log(error.networkError.result.errors);

    const total_score = 
    [
        {
            race_name : '八強賽 - 第一場',
            deal_p1 : '發球',
            deal_p2 : ' ',
            name_p1 : 'Novak Djokovic',
            name_p2 : 'Rafael Nadal',
            point_p1 : 0,
            point_p2 : 0,
            game1_p1 : 0,
            game1_p2 : 0,
            game2_p1 : 0,
            game2_p2 : 0,
            game3_p1 : 0,
            game3_p2 : 0,
        },
        {
            race_name : '八強賽 - 第二場(已完賽)',
            deal_p1 : ' ',
            deal_p2 : ' ',
            name_p1 : 'Aslan Karatsev',
            name_p2 : 'Daniil Medvedev',
            point_p1 : 0,
            point_p2 : 0,
            game1_p1 : 6,
            game1_p2 : 3,
            game2_p1 : 2,
            game2_p2 : 6,
            game3_p1 : 6,
            game3_p2 : 4,
        },
        {
            race_name : '八強賽 - 第三場(已完賽)',
            deal_p1 : ' ',
            deal_p2 : ' ',
            name_p1 : 'John Millman',
            name_p2 : 'Denis Shapovalov',
            point_p1 : 0,
            point_p2 : 0,
            game1_p1 : 4,
            game1_p2 : 6,
            game2_p1 : 6,
            game2_p2 : 7,
            game3_p1 : 0,
            game3_p2 : 0,
        },
        {
            race_name : '八強賽 - 第四場',
            deal_p1 : ' ',
            deal_p2 : '發球',
            name_p1 : 'Dominic Thiem',
            name_p2 : 'Kei Nishikori',
            point_p1 : 0,
            point_p2 : 0,
            game1_p1 : 3,
            game1_p2 : 6,
            game2_p1 : 2,
            game2_p2 : 3,
            game3_p1 : 0,
            game3_p2 : 0,
        }
    ]
    
    return total_score.map(score => {
        return <TrackingTableView score={score}/>
    })
}

const TrackingTableView = ({score}) => {

    const classes_table = useStyles_table();
    const classes_typo = useStyles_typo();

    const [deal_p1, setdealp1] = useState(score.deal_p1)
    const [deal_p2, setdealp2] = useState(score.deal_p2)
    const [point_p1, setpointp1] = useState(score.point_p1)
    const [point_p2, setpointp2] = useState(score.point_p2)
    const [game1_p1, setgame1p1] = useState(score.game1_p1)
    const [game1_p2, setgame1p2] = useState(score.game1_p2)
    const [game2_p1, setgame2p1] = useState(score.game2_p1)
    const [game2_p2, setgame2p2] = useState(score.game2_p2)
    const [game3_p1, setgame3p1] = useState(score.game3_p1)
    const [game3_p2, setgame3p2] = useState(score.game3_p2)

    return (

        // TrackingTable(score)
        [
        <Typography variant="h4" className={classes_typo.title}> {score.race_name} </Typography>,
        
        <TableContainer component={Paper}>
            <Table className={classes_table.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell> 選手名稱 </TableCell>
                    <TableCell align="center"> 發球權 </TableCell>
                    <TableCell align="center"> 分 </TableCell>
                    <TableCell align="center"> 第一局 </TableCell>
                    <TableCell align="center"> 第二局 </TableCell>
                    <TableCell align="center"> 第三局 </TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                
                    <TableRow>
                    <TableCell component="th" scope="row">
                        {score.name_p1}
                    </TableCell>
                    <TableCell align="center">
                        {deal_p1}
                    </TableCell>
                    <TableCell align="center">
                        {point_p1}
                    </TableCell>
                    <TableCell align="center">
                        {game1_p1}
                    </TableCell>
                    <TableCell align="center">
                        {game2_p1}
                    </TableCell>
                    <TableCell align="center">
                        {game3_p1}
                    </TableCell>
                    </TableRow>

                    <TableRow>
                    <TableCell component="th" scope="row">
                        {score.name_p2}
                    </TableCell>
                    <TableCell align="center">
                        {deal_p2}
                    </TableCell>
                    <TableCell align="center">
                        {point_p2}
                    </TableCell>
                    <TableCell align="center">
                        {game1_p2}
                    </TableCell>
                    <TableCell align="center">
                        {game2_p2}
                    </TableCell>
                    <TableCell align="center">
                        {game3_p2}
                    </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>
        ]
    );
}

export default EventTrackingView;
