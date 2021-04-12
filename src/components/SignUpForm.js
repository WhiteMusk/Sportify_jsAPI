import { useState } from 'react'
import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

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
    },
    textFieldLabel: {
        display: "inline",
        marginLeft: "5px",
        marginRight: "5px",
    },
    submitBut: {
        marginTop: "30px",
        float: "right"
    },
    appBarSpacer: theme.mixins.toolbar,
}));

function SignUpForm() {
    const classes = useStyles();
    const [group, setGruop] = useState(0);
    const [category, setCategory] = useState("");

    const handleGroupChange = (event) => {
        setGruop(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    }

    return (
        <Container maxWidth="md" className={classes.container}>
            <div className={classes.appBarSpacer} />
            <Paper>
                <Container maxWidth="md" className={classes.container}>
                    <Grid>
                        <Typography variant="h4">報名表單</Typography>
                    </Grid>
                    <FormControl className={classes.form}>
                        <Grid>
                            <Typography className={classes.fromItemTitle}>您的名字是</Typography>
                            <TextField label="Name" variant="outlined" />
                        </Grid>
                        <Grid>
                            <Typography className={classes.fromItemTitle}>生理性別</Typography>
                            <RadioGroup aria-label="gender" name="gender1">
                                <FormControlLabel value="female" control={<Radio />} label="女" />
                                <FormControlLabel value="male" control={<Radio />} label="男" />
                            </RadioGroup>
                        </Grid>
                        <Grid>
                            <Typography className={classes.fromItemTitle}>出生日期</Typography>
                            <TextField
                                type="date"
                                defaultValue="2010-05-24"
                            />
                        </Grid>
                        <Grid>
                            <Typography className={classes.fromItemTitle}>您的email</Typography>
                            <TextField label="Email" variant="outlined" />
                        </Grid>
                        <Grid>
                            <Typography className={classes.fromItemTitle}>單打/雙打</Typography>
                            <RadioGroup aria-label="category" name="category" value={category} onChange={handleCategoryChange}>
                                <FormControlLabel value="singles" control={<Radio />} label="單打" />
                                <FormControlLabel value="doubles" control={<Radio />} label="雙打" />
                            </RadioGroup>
                            {category !== "doubles" ?
                                <React.Fragment></React.Fragment> :
                                <React.Fragment>
                                    <Typography className={classes.fromItemTitle}>雙打搭檔姓名</Typography>
                                    <TextField label="Partner Name" variant="outlined" />
                                </React.Fragment>}
                        </Grid>
                        <Grid>
                            <Typography className={classes.fromItemTitle}>身分證字號</Typography>
                            <TextField label="ID Num" variant="outlined" />
                        </Grid>
                        <Grid>
                            <Typography className={classes.fromItemTitle}>參賽組別</Typography>
                            {/* <InputLabel htmlFor="group">Group</InputLabel> */}
                            <Select
                                inputProps={{
                                    id: "group"
                                }}
                                value={group}
                                onChange={handleGroupChange}
                            >
                                <MenuItem value={0}>請選擇組別</MenuItem>
                                <MenuItem value={1}>A組</MenuItem>
                                <MenuItem value={2}>B組</MenuItem>
                                <MenuItem value={3}>C組</MenuItem>
                            </Select>
                        </Grid>
                        <Grid>
                            <Typography className={classes.fromItemTitle}>連絡電話</Typography>
                            <TextField label="Phone" variant="outlined" />
                        </Grid>
                        <Grid>
                            <Typography className={classes.fromItemTitle}>緊急聯絡人</Typography>
                            <Typography className={classes.textFieldLabel}>姓名</Typography>
                            <TextField label="Emergency Contact" variant="outlined" />
                            <Typography className={classes.textFieldLabel}>電話</Typography>
                            <TextField label="Contact Phone" variant="outlined" />
                        </Grid>
                        <Grid>
                            <Button className={classes.submitBut} variant="contained" color="default">
                                提交表單
                            </Button>
                        </Grid>
                    </FormControl>
                </Container>
            </Paper>
        </Container>
    );
}

export default SignUpForm;