import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    form: {
        marginTop: "20px",
    },
    fromItemTitle: {
        marginTop: "10px",
        marginBottom: "10px",
        fontSize: "1.5em",
    },
    textFieldLabel: {
        display: "inline",
        marginLeft: "5px",
        marginRight: "5px",
    },
    backBut: {
        float: "right",
    },
    appBarSpacer: theme.mixins.toolbar,
}));

function SignUpSuccess(props) {
    const classes = useStyles();

    return (
        <Paper>
            <Container maxWidth="md" className={classes.container}>
                <Button className={classes.backBut} variant="contained" color="default"
                    component={NavLink} to={"/event/" + props.application.event_id}
                >
                    回比賽資訊
                </Button>
                <Grid>
                    <Typography variant="h4">報名成功！</Typography>
                </Grid>
                <Grid>
                    <Typography className={classes.fromItemTitle}>名字</Typography>
                    <Typography>{props.application.applicant.name}</Typography>
                </Grid>
                <Grid>
                    <Typography className={classes.fromItemTitle}>生理性別</Typography>
                    <Typography>{props.application.applicant.gender === "female" ? "女" : "男"}</Typography>
                </Grid>
                <Grid>
                    <Typography className={classes.fromItemTitle}>出生日期</Typography>
                    <Typography>{props.application.applicant.birthday.slice(0, 10)}</Typography>
                </Grid>
                <Grid>
                    <Typography className={classes.fromItemTitle}>Email</Typography>
                    <Typography>{props.application.applicant.email}</Typography>
                </Grid>
                <Grid>
                    <Typography className={classes.fromItemTitle}>單打/雙打</Typography>
                    {props.application.event_option.category === "single" ? "單打" : "雙打"}
                    {props.application.event_option.category !== "doubles" ?
                        <React.Fragment></React.Fragment> :
                        <React.Fragment>
                            <Typography className={classes.fromItemTitle}>雙打搭檔姓名</Typography>
                            <Typography>{props.application.event_option.partner}</Typography>
                        </React.Fragment>}
                </Grid>
                <Grid>
                    <Typography className={classes.fromItemTitle}>參賽組別</Typography>
                    <Typography>{props.application.event_option.group === 1 ?
                        "A組" : (
                            props.application.event_option.group === 2 ? "B組" : "C組"
                        )}</Typography>
                </Grid>
                <Grid>
                    <Typography className={classes.fromItemTitle}>連絡電話</Typography>
                    <Typography>{props.application.applicant.phone}</Typography>
                </Grid>
                <Grid>
                    <Typography className={classes.fromItemTitle}>緊急聯絡人姓名</Typography>
                    <Typography>{props.application.emergency_contact.name}</Typography>
                    <Typography className={classes.fromItemTitle}>緊急聯絡人關係</Typography>
                    <Typography>{props.application.emergency_contact.relationship}</Typography>
                    <Typography className={classes.fromItemTitle}>緊急聯絡人電話</Typography>
                    <Typography>{props.application.emergency_contact.phone}</Typography>
                </Grid>
            </Container>
        </Paper>
    )
}

export default SignUpSuccess;