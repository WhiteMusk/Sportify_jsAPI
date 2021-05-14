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

import Button from '@material-ui/core/Button';

const useStyles_table = makeStyles({
  table: {
    minWidth: 1000,
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

// function getscore(player, set_p1, set_p2, game_p1, game_p2, point_p1, point_p2, deal_p1, deal_p2){

//     // 兩個人的得分分開處理

//     if (player == 'p1'){

//         // 如果進入搶七局
//         if (game_p1 == 6 && game_p2 == 6){
//             point_p1 += 1
            
//             // 如果因此而結束搶七，則如此處理分數
//             if (point_p1 >= 6 && point_p1 >= point_p2 + 2){

//                 // 交換發球
//                 if (deal_p1 == ' '){
//                     deal_p1 = '發球'
//                     deal_p2 = ' '
//                 }
//                 else{
//                     deal_p1 = ' '
//                     deal_p2 = '發球'
//                 }

//                 point_p1 = 0
//                 point_p2 = 0
//                 game_p1 = 0
//                 game_p2 = 0
//                 set_p1 += 1

//             }

//             else if ((point_p1 + point_p2) % 2 == 1){
                
//                 // 交換發球
//                 if (deal_p1 == ' '){
//                     deal_p1 = '發球'
//                     deal_p2 = ' '
//                 }
//                 else{
//                     deal_p1 = ' '
//                     deal_p2 = '發球'
//                 }

//             }
//         }

//         // 如果未進到搶七局，就先處理分數
//         else{

//             if (point_p1 === 0){
//                 point_p1 = 15
//             }
//             else if (point_p1 == 15){
//                 point_p1 = 30
//             }
//             else if (point_p1 == 30){
//                 point_p1 = 40
//             }
//             else if (point_p1 == 40){
//                 if (point_p2 == 40){
//                     point_p1 = 'AD'
//                     point_p2 = ' '
//                 }
//                 else if (point_p2 == 'AD'){
//                     point_p1 = 40
//                     point_p2 = 40
//                 }
//                 else{

//                     // 交換發球
//                     if (deal_p1 == ' '){
//                         deal_p1 = '發球'
//                         deal_p2 = ' '
//                     }
//                     else{
//                         deal_p1 = ' '
//                         deal_p2 = '發球'
//                     }

//                     point_p1 = 0
//                     point_p2 = 0
//                     game_p1 += 1

//                 }
//             }
//             else if (point_p1 === ' '){
//                 point_p1 = 40
//                 point_p2 = 40
//             }
//             else if (point_p1 == 'AD'){
                
//                 // 交換發球
//                 if (deal_p1 == ' '){
//                     deal_p1 = '發球'
//                     deal_p2 = ' '
//                 }
//                 else{
//                     deal_p1 = ' '
//                     deal_p2 = '發球'
//                 }

//                 point_p1 = 0
//                 point_p2 = 0
//                 game_p1 += 1
                
//             }
    
//             // 如果因此進入搶七局，則修正分數
//             if (game_p1 == 6 && game_p2 == 6){

//                 point_p1 = 0
//                 point_p2 = 0
 
//             }

//             // 如果單純的結束這一局，則修正分數
//             else if (game_p1 >= 6 && game_p1 >= game_p2 + 2)
//             {

//                 point_p1 = 0
//                 point_p2 = 0
//                 game_p1 = 0
//                 game_p2 = 0
//                 set_p1 += 1

//             }
//         }
//     }

//     if (player == 'p2'){
        
//         // 如果進入搶七局
//         if (game_p2 == 6 && game_p1 == 6){
//             point_p2 += 1
            
//             // 如果因此而結束搶七，則如此處理分數
//             if (point_p2 >= 6 && point_p2 >= point_p1 + 2){
                
//                 // 交換發球
//                 if (deal_p1 == ' '){
//                     deal_p1 = '發球'
//                     deal_p2 = ' '
//                 }
//                 else{
//                     deal_p1 = ' '
//                     deal_p2 = '發球'
//                 }

//                 point_p2 = 0
//                 point_p1 = 0
//                 game_p2 = 0
//                 game_p1 = 0
//                 set_p2 += 1
                
//             }

//             else if ((point_p1 + point_p2) % 2 == 1){
                
//                 // 交換發球
//                 if (deal_p1 == ' '){
//                     deal_p1 = '發球'
//                     deal_p2 = ' '
//                 }
//                 else{
//                     deal_p1 = ' '
//                     deal_p2 = '發球'
//                 }

//             }
//         }
        
//         // 如果未進到搶七局，就先處理分數
//         else{
        
//             if (point_p2 === 0){
//                 point_p2 = 15
//             }
//             else if (point_p2 == 15){
//                 point_p2 = 30
//             }
//             else if (point_p2 == 30){
//                 point_p2 = 40
//             }
//             else if (point_p2 == 40){
//                 if (point_p1 == 40){
//                     point_p2 = 'AD'
//                     point_p1 = ' '
//                 }
//                 else if (point_p1 == 'AD'){
//                     point_p2 = 40
//                     point_p1 = 40
//                 }
//                 else{
                    
//                     // 交換發球
//                     if (deal_p1 == ' '){
//                         deal_p1 = '發球'
//                         deal_p2 = ' '
//                     }
//                     else{
//                         deal_p1 = ' '
//                         deal_p2 = '發球'
//                     }

//                     point_p2 = 0
//                     point_p1 = 0
//                     game_p2 += 1
  
//                 }
//             }
//             else if (point_p2 === ' '){
//                 point_p2 = 40
//                 point_p1 = 40
//             }
//             else if (point_p2 == 'AD'){
                
//                 // 交換發球
//                 if (deal_p1 == ' '){
//                     deal_p1 = '發球'
//                     deal_p2 = ' '
//                 }
//                 else{
//                     deal_p1 = ' '
//                     deal_p2 = '發球'
//                 }

//                 point_p2 = 0
//                 point_p1 = 0
//                 game_p2 += 1
                
//             }

//             // 如果因此進入搶七局，則修正分數
//             if (game_p2 == 6 && game_p1 == 6){
                
//                 point_p2 = 0
//                 point_p1 = 0
 
//             }

//             // 如果單純的結束這一局，則修正分數
//             else if (game_p2 >= 6 && game_p2 >= game_p1 + 2){

//                 point_p2 = 0
//                 point_p1 = 0
//                 game_p2 = 0
//                 game_p1 = 0
//                 set_p2 += 1
  
//             }
//         } 
//     }
//     var score = {p1: point_p1, p2: point_p2, g1: game_p1, g2:game_p2, s1:set_p1, s2:set_p2, d1:deal_p1, d2:deal_p2};
//     return score;
// }

function SwitchDeal(deal){

    switch (deal) {
        case ' ':
            return '發球'
    
        default:
            return ' '
    }
}

function AddScore(score_p1, score_p2){

    switch (score_p1) {
        case 0:     
            return {p1: 15, p2: score_p2}

        case 15:  
            return {p1: 30, p2: score_p2}
        
        case 30:
            return {p1: 40, p2: score_p2}

        case 40:
            switch (score_p2) {
                case 40:
                    return {p1: 'AD', p2: 40}

                case 'AD':
                    return {p1: 40, p2: 40}
            
                default:
                    return {p1: 0, p2: 0}
            }
        
        case 'AD':
            return {p1: 0, p2: 0}
    
        default:
            return {p1: score_p1, p2: score_p2}
    }
}

function MinusScore(score_p1, score_p2){

    switch (score_p1) {
        case 15:  
            return {p1: 0, p2: score_p2}

        case 30:
            return {p1: 15, p2: score_p2}

        case 40:
            switch (score_p2) {
                case 'AD':
                    return {p1: score_p1, p2: score_p2}
            
                default:
                    return {p1: 30, p2: score_p2} 
            }
        
        case 'AD':
            return {p1: 40, p2: score_p2}
    
        default:
            return {p1: score_p1, p2: score_p2}
    }
}

function AddPoint(point_p1, point_p2){

    if (point_p1 <= 5 && point_p2 <= 6){
        return point_p1 + 1
    }
    else if(point_p1 == 6 && point_p2 >= 5 && point_p2 <= 6){
        return point_p1 + 1
    }
    return point_p1
}

function MinusPoint(point_p1, point_p2){

    if (point_p1 >= 1 && point_p2 <= 6){
        return point_p1 - 1
    }
    return point_p1
}

function EventTracking(props) {

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
        return <TrackingTable score={score}/>
    })
}

const TrackingTable = ({score}) => {

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
                    <TableCell align="center">  </TableCell>
                    <TableCell align="center"> 分 </TableCell>
                    <TableCell align="center">  </TableCell>
                    <TableCell align="center"> 第一局 </TableCell>
                    <TableCell align="center">  </TableCell>
                    <TableCell align="center"> 第二局 </TableCell>
                    <TableCell align="center">  </TableCell>
                    <TableCell align="center"> 第三局 </TableCell>
                    <TableCell align="center">  </TableCell>
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
                        {<Button onClick = {() => setdealp1(SwitchDeal(deal_p1))}> 交換發球權 </Button>}
                    </TableCell>
                    <TableCell align="center">
                        {point_p1}
                    </TableCell>
                    <TableCell align="center">
                        <div>
                            {<Button size="small" onClick = {() => (setpointp1(AddScore(point_p1,point_p2).p1), setpointp2(AddScore(point_p1,point_p2).p2))}> + </Button>}
                        </div>
                        <div>
                            {<Button size="small" onClick = {() => (setpointp1(MinusScore(point_p1,point_p2).p1), setpointp2(MinusScore(point_p1,point_p2).p2))}> - </Button>}
                        </div>
                    </TableCell>
                    <TableCell align="center">
                        {game1_p1}
                    </TableCell>
                    <TableCell align="center">
                        <div>
                            {<Button size="small" onClick = {() => setgame1p1(AddPoint(game1_p1,game1_p2))}> + </Button>}
                        </div>
                        <div>
                            {<Button size="small" onClick = {() => setgame1p1(MinusPoint(game1_p1,game1_p2))}> - </Button>}
                        </div>
                    </TableCell>
                    <TableCell align="center">
                        {game2_p1}
                    </TableCell>
                    <TableCell align="center">
                        <div>
                            {<Button size="small" onClick = {() => setgame2p1(AddPoint(game2_p1,game2_p2))}> + </Button>}
                        </div>
                        <div>
                            {<Button size="small" onClick = {() => setgame2p1(MinusPoint(game2_p1,game2_p2))}> - </Button>}
                        </div>
                    </TableCell>
                    <TableCell align="center">
                        {game3_p1}
                    </TableCell>
                    <TableCell align="center">
                        <div>
                            {<Button size="small" onClick = {() => setgame3p1(AddPoint(game3_p1,game3_p2))}> + </Button>}
                        </div>
                        <div>
                            {<Button size="small" onClick = {() => setgame3p1(MinusPoint(game3_p1,game3_p2))}> - </Button>}
                        </div>
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
                        {<Button onClick = {() => setdealp2(SwitchDeal(deal_p2))}> 交換發球權 </Button>}
                    </TableCell>
                    <TableCell align="center">
                        {point_p2}
                    </TableCell>
                    <TableCell align="center">
                        <div>
                            {<Button size="small" onClick = {() => (setpointp2(AddScore(point_p2,point_p1).p1), setpointp1(AddScore(point_p2,point_p1).p2))}> + </Button>}
                        </div>
                        <div>
                            {<Button size="small" onClick = {() => (setpointp2(MinusScore(point_p2,point_p1).p1), setpointp1(MinusScore(point_p2,point_p1).p2))}> - </Button>}
                        </div>
                    </TableCell>
                    <TableCell align="center">
                        {game1_p2}
                    </TableCell>
                    <TableCell align="center">
                        <div>
                            {<Button size="small" onClick = {() => setgame1p2(AddPoint(game1_p2,game1_p1))}> + </Button>}
                        </div>
                        <div>
                            {<Button size="small" onClick = {() => setgame1p2(MinusPoint(game1_p2,game1_p1))}> - </Button>}
                        </div>
                    </TableCell>
                    <TableCell align="center">
                        {game2_p2}
                    </TableCell>
                    <TableCell align="center">
                        <div>
                            {<Button size="small" onClick = {() => setgame2p2(AddPoint(game2_p2,game2_p1))}> + </Button>}
                        </div>
                        <div>
                            {<Button size="small" onClick = {() => setgame2p2(MinusPoint(game2_p2,game2_p1))}> - </Button>}
                        </div>
                    </TableCell>
                    <TableCell align="center">
                        {game3_p2}
                    </TableCell>
                    <TableCell align="center">
                        <div>
                            {<Button size="small" onClick = {() => setgame3p2(AddPoint(game3_p2,game3_p1))}> + </Button>}
                        </div>
                        <div>
                            {<Button size="small" onClick = {() => setgame3p2(MinusPoint(game3_p2,game3_p1))}> - </Button>}
                        </div>
                    </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>

        ]

    );

}


export default EventTracking;
