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

import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function getscore(player, set_p1, set_p2, game_p1, game_p2, point_p1, point_p2, deal_p1, deal_p2){

    // 兩個人的得分分開處理

    if (player == 'p1'){

        // 如果進入搶七局
        if (game_p1 == 6 && game_p2 == 6){
            point_p1 += 1
            
            // 如果因此而結束搶七，則如此處理分數
            if (point_p1 >= 6 && point_p1 >= point_p2 + 2){

                // 交換發球
                if (deal_p1 == ' '){
                    deal_p1 = '發球'
                    deal_p2 = ' '
                }
                else{
                    deal_p1 = ' '
                    deal_p2 = '發球'
                }

                point_p1 = 0
                point_p2 = 0
                game_p1 = 0
                game_p2 = 0
                set_p1 += 1

            }

            else if ((point_p1 + point_p2) % 2 == 1){
                
                // 交換發球
                if (deal_p1 == ' '){
                    deal_p1 = '發球'
                    deal_p2 = ' '
                }
                else{
                    deal_p1 = ' '
                    deal_p2 = '發球'
                }

            }
        }

        // 如果未進到搶七局，就先處理分數
        else{

            if (point_p1 === 0){
                point_p1 = 15
            }
            else if (point_p1 == 15){
                point_p1 = 30
            }
            else if (point_p1 == 30){
                point_p1 = 40
            }
            else if (point_p1 == 40){
                if (point_p2 == 40){
                    point_p1 = 'AD'
                    point_p2 = ' '
                }
                else if (point_p2 == 'AD'){
                    point_p1 = 40
                    point_p2 = 40
                }
                else{

                    // 交換發球
                    if (deal_p1 == ' '){
                        deal_p1 = '發球'
                        deal_p2 = ' '
                    }
                    else{
                        deal_p1 = ' '
                        deal_p2 = '發球'
                    }

                    point_p1 = 0
                    point_p2 = 0
                    game_p1 += 1

                }
            }
            else if (point_p1 === ' '){
                point_p1 = 40
                point_p2 = 40
            }
            else if (point_p1 == 'AD'){
                
                // 交換發球
                if (deal_p1 == ' '){
                    deal_p1 = '發球'
                    deal_p2 = ' '
                }
                else{
                    deal_p1 = ' '
                    deal_p2 = '發球'
                }

                point_p1 = 0
                point_p2 = 0
                game_p1 += 1
                
            }
    
            // 如果因此進入搶七局，則修正分數
            if (game_p1 == 6 && game_p2 == 6){

                point_p1 = 0
                point_p2 = 0
 
            }

            // 如果單純的結束這一局，則修正分數
            else if (game_p1 >= 6 && game_p1 >= game_p2 + 2)
            {

                point_p1 = 0
                point_p2 = 0
                game_p1 = 0
                game_p2 = 0
                set_p1 += 1

            }
        }
    }

    if (player == 'p2'){
        
        // 如果進入搶七局
        if (game_p2 == 6 && game_p1 == 6){
            point_p2 += 1
            
            // 如果因此而結束搶七，則如此處理分數
            if (point_p2 >= 6 && point_p2 >= point_p1 + 2){
                
                // 交換發球
                if (deal_p1 == ' '){
                    deal_p1 = '發球'
                    deal_p2 = ' '
                }
                else{
                    deal_p1 = ' '
                    deal_p2 = '發球'
                }

                point_p2 = 0
                point_p1 = 0
                game_p2 = 0
                game_p1 = 0
                set_p2 += 1
                
            }

            else if ((point_p1 + point_p2) % 2 == 1){
                
                // 交換發球
                if (deal_p1 == ' '){
                    deal_p1 = '發球'
                    deal_p2 = ' '
                }
                else{
                    deal_p1 = ' '
                    deal_p2 = '發球'
                }

            }
        }
        
        // 如果未進到搶七局，就先處理分數
        else{
        
            if (point_p2 === 0){
                point_p2 = 15
            }
            else if (point_p2 == 15){
                point_p2 = 30
            }
            else if (point_p2 == 30){
                point_p2 = 40
            }
            else if (point_p2 == 40){
                if (point_p1 == 40){
                    point_p2 = 'AD'
                    point_p1 = ' '
                }
                else if (point_p1 == 'AD'){
                    point_p2 = 40
                    point_p1 = 40
                }
                else{
                    
                    // 交換發球
                    if (deal_p1 == ' '){
                        deal_p1 = '發球'
                        deal_p2 = ' '
                    }
                    else{
                        deal_p1 = ' '
                        deal_p2 = '發球'
                    }

                    point_p2 = 0
                    point_p1 = 0
                    game_p2 += 1
  
                }
            }
            else if (point_p2 === ' '){
                point_p2 = 40
                point_p1 = 40
            }
            else if (point_p2 == 'AD'){
                
                // 交換發球
                if (deal_p1 == ' '){
                    deal_p1 = '發球'
                    deal_p2 = ' '
                }
                else{
                    deal_p1 = ' '
                    deal_p2 = '發球'
                }

                point_p2 = 0
                point_p1 = 0
                game_p2 += 1
                
            }

            // 如果因此進入搶七局，則修正分數
            if (game_p2 == 6 && game_p1 == 6){
                
                point_p2 = 0
                point_p1 = 0
 
            }

            // 如果單純的結束這一局，則修正分數
            else if (game_p2 >= 6 && game_p2 >= game_p1 + 2){

                point_p2 = 0
                point_p1 = 0
                game_p2 = 0
                game_p1 = 0
                set_p2 += 1
  
            }
        } 
    }
    var score = {p1: point_p1, p2: point_p2, g1: game_p1, g2:game_p2, s1:set_p1, s2:set_p2, d1:deal_p1, d2:deal_p2};
    return score;
}

function EventTracking(props) {
    const classes = useStyles();

    const { loading, error, data } = useQuery(Host_EventOverview_QUERY, { variables: { eventId: props.eventID } });
    // if (error) console.log(error);
    if (error) console.log(error.networkError.result.errors);

    const [set_p1, setsetp1] = useState(0)
    const [set_p2, setsetp2] = useState(0)
    const [game_p1, setgamep1] = useState(0)
    const [game_p2, setgamep2] = useState(0)
    const [point_p1, setpointp1] = useState(0)
    const [point_p2, setpointp2] = useState(0)
    const [deal_p1, setdealp1] = useState('發球')
    const [deal_p2, setdealp2] = useState(' ')

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell> 選手名稱 </TableCell>
                    <TableCell align="center"> 盤(set) </TableCell>
                    <TableCell align="center"> 局(game) </TableCell>
                    <TableCell align="center"> 分(point) </TableCell>
                    <TableCell align="center"> 發球權 </TableCell>
                    <TableCell align="center"> 分數修改 </TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                
                    <TableRow key = '選手A' >
                    <TableCell component="th" scope="row">
                        選手A
                    </TableCell>
                    <TableCell align="center">
                        {set_p1}
                    </TableCell>
                    <TableCell align="center">
                        {game_p1}
                    </TableCell>
                    <TableCell align="center">
                        {point_p1}
                    </TableCell>
                    <TableCell align="center">
                        {deal_p1}
                    </TableCell>
                    <TableCell align="center">
                        <Button onClick={() => (setpointp1(getscore('p1',set_p1, set_p2, game_p1, game_p2, point_p1, point_p2, deal_p1, deal_p2).p1), 
                        setpointp2(getscore('p1',set_p1, set_p2, game_p1, game_p2, point_p1, point_p2, deal_p1, deal_p2).p2), 
                        setgamep1(getscore('p1',set_p1, set_p2, game_p1, game_p2, point_p1, point_p2, deal_p1, deal_p2).g1), 
                        setgamep2(getscore('p1',set_p1, set_p2, game_p1, game_p2, point_p1, point_p2, deal_p1, deal_p2).g2), 
                        setsetp1(getscore('p1',set_p1, set_p2, game_p1, game_p2, point_p1, point_p2, deal_p1, deal_p2).s1), 
                        setsetp2(getscore('p1',set_p1, set_p2, game_p1, game_p2, point_p1, point_p2, deal_p1, deal_p2).s2),
                        setdealp1(getscore('p1',set_p1, set_p2, game_p1, game_p2, point_p1, point_p2, deal_p1, deal_p2).d1), 
                        setdealp2(getscore('p1',set_p1, set_p2, game_p1, game_p2, point_p1, point_p2, deal_p1, deal_p2).d2) )}> 選手A得分 </Button>
                    </TableCell>
                    </TableRow>

                    <TableRow key = '選手B' >
                    <TableCell component="th" scope="row">
                        選手B
                    </TableCell>
                    <TableCell align="center">
                        {set_p2}
                    </TableCell>
                    <TableCell align="center">
                        {game_p2}
                    </TableCell>
                    <TableCell align="center">
                        {point_p2}
                    </TableCell>
                    <TableCell align="center">
                        {deal_p2}
                    </TableCell>
                    <TableCell align="center">
                        <Button onClick={() => (setpointp1(getscore('p2',set_p1, set_p2, game_p1, game_p2, point_p1, point_p2, deal_p1, deal_p2).p1), 
                        setpointp2(getscore('p2',set_p1, set_p2, game_p1, game_p2, point_p1, point_p2, deal_p1, deal_p2).p2), 
                        setgamep1(getscore('p2',set_p1, set_p2, game_p1, game_p2, point_p1, point_p2, deal_p1, deal_p2).g1), 
                        setgamep2(getscore('p2',set_p1, set_p2, game_p1, game_p2, point_p1, point_p2, deal_p1, deal_p2).g2), 
                        setsetp1(getscore('p2',set_p1, set_p2, game_p1, game_p2, point_p1, point_p2, deal_p1, deal_p2).s1), 
                        setsetp2(getscore('p2',set_p1, set_p2, game_p1, game_p2, point_p1, point_p2, deal_p1, deal_p2).s2),
                        setdealp1(getscore('p2',set_p1, set_p2, game_p1, game_p2, point_p1, point_p2, deal_p1, deal_p2).d1), 
                        setdealp2(getscore('p2',set_p1, set_p2, game_p1, game_p2, point_p1, point_p2, deal_p1, deal_p2).d2) )}> 選手B得分 </Button>
                    </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>

    );
}

export default EventTracking;
