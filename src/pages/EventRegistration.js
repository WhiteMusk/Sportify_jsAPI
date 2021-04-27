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
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import SignUpSuccess from '../components/SignUpSuccess';
import { Link } from "react-router-dom";

const API_ROOT = 'http://localhost:5000/';
const instance = axios.create({
    baseURL: API_ROOT
});

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
    },
    appBarSpacer: theme.mixins.toolbar,
    backBut: {
        float: "right",
    },
}));

function EventRegistration(props) {
    const classes = useStyles();
    const [applicantName, setApplicantName] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    const [email, setEmail] = useState("");
    const [applicantPhone, setApplicantPhone] = useState("");
    const [group, setGruop] = useState(0);
    const [category, setCategory] = useState("");
    const [partner, setPartner] = useState("");
    const [emergencyName, setEmergencyName] = useState("");
    const [emergencyPhone, setEmergencyPhone] = useState("");
    const [emergencyRelation, setEmergencyRelation] = useState("");
    const [application, setApplication] = useState({});
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setApplication(
            {
                event_id: props.match.params.eventID,
                applicant: {
                    name: applicantName,
                    gender: gender,
                    birthday: birthday,
                    email: email,
                    phone: applicantPhone
                },
                emergency_contact: {
                    name: emergencyName,
                    relationship: emergencyRelation,
                    phone: emergencyPhone
                },
                event_option: {
                    category: category,
                    partner: partner,
                    group: group,
                }
            }
        )

        const { data: success } = await instance.post('forms/newApplication', {
            application
        })

        setSuccess(true);
        alert("新增比賽成功！");
    }

    return (
        <Container maxWidth="md" className={classes.container}>
                <div className={classes.appBarSpacer} />
                {!success ?
                    <Paper>
                        <Container maxWidth="md" className={classes.container}>
                            <Button className={classes.backBut} variant="contained" color="default"
                                component={Link} to={"/event/" + props.match.params.eventID}
                            >
                                回比賽資訊
                    </Button>
                            <Grid>
                                <Typography variant="h4">報名表單</Typography>
                            </Grid>
                            <FormControl className={classes.form}>
                                <Grid>
                                    <Typography className={classes.fromItemTitle}>您的名字是</Typography>
                                    <TextField required label="Name" variant="outlined"
                                        value={applicantName}
                                        onInput={e => setApplicantName(e.target.value)}
                                    />
                                </Grid>
                                <Grid>
                                    <Typography className={classes.fromItemTitle}>生理性別</Typography>
                                    <RadioGroup required aria-label="gender" name="gender1"
                                        value={gender}
                                        onChange={e => setGender(e.target.value)}
                                    >
                                        <FormControlLabel value="female" control={<Radio />} label="女" />
                                        <FormControlLabel value="male" control={<Radio />} label="男" />
                                    </RadioGroup>
                                </Grid>
                                <Grid>
                                    <Typography className={classes.fromItemTitle}>出生日期</Typography>
                                    <TextField
                                        required
                                        type="date"
                                        defaultValue="2010-05-24"
                                        value={birthday}
                                        onInput={e => setBirthday(e.target.value)}
                                    />
                                </Grid>
                                <Grid>
                                    <Typography className={classes.fromItemTitle}>您的email</Typography>
                                    <TextField required label="Email" variant="outlined"
                                        value={email}
                                        onInput={e => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid>
                                    <Typography className={classes.fromItemTitle}>單打/雙打</Typography>
                                    <RadioGroup required aria-label="category" name="category"
                                        value={category}
                                        onChange={e => setCategory(e.target.value)}
                                    >
                                        <FormControlLabel value="singles" control={<Radio />} label="單打" />
                                        <FormControlLabel value="doubles" control={<Radio />} label="雙打" />
                                    </RadioGroup>
                                    {category !== "doubles" ?
                                        <React.Fragment></React.Fragment> :
                                        <React.Fragment>
                                            <Typography className={classes.fromItemTitle}>雙打搭檔姓名</Typography>
                                            <TextField label="Partner Name" variant="outlined"
                                                value={partner}
                                                onInput={e => setPartner(e.target.value)}
                                            />
                                        </React.Fragment>}
                                </Grid>
                                <Grid>
                                    <Typography className={classes.fromItemTitle}>參賽組別</Typography>
                                    {/* <InputLabel htmlFor="group">Group</InputLabel> */}
                                    <Select required
                                        inputProps={{
                                            id: "group"
                                        }}
                                        value={group}
                                        onChange={e => setGruop(e.target.value)}
                                    >
                                        <MenuItem value={0}>請選擇組別</MenuItem>
                                        <MenuItem value={1}>A組</MenuItem>
                                        <MenuItem value={2}>B組</MenuItem>
                                        <MenuItem value={3}>C組</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid>
                                    <Typography className={classes.fromItemTitle}>聯絡電話</Typography>
                                    <TextField required label="Phone" variant="outlined"
                                        value={applicantPhone}
                                        onInput={e => setApplicantPhone(e.target.value)}
                                    />
                                </Grid>
                                <Grid>
                                    <Typography className={classes.fromItemTitle}>緊急聯絡人</Typography>
                                    <Typography className={classes.textFieldLabel}>姓名</Typography>
                                    <TextField required label="Emergency Contact" variant="outlined"
                                        value={emergencyName}
                                        onInput={e => setEmergencyName(e.target.value)}
                                    />
                                    <Typography className={classes.textFieldLabel}>關係</Typography>
                                    <TextField required label="Relationship" variant="outlined"
                                        value={emergencyRelation}
                                        onInput={e => setEmergencyRelation(e.target.value)}
                                    />
                                    <Typography className={classes.textFieldLabel}>電話</Typography>
                                    <TextField required label="Contact Phone" variant="outlined"
                                        value={emergencyPhone}
                                        onInput={e => setEmergencyPhone(e.target.value)}
                                    />
                                </Grid>
                                <Grid>
                                    <Button className={classes.submitBut} variant="contained" color="default"
                                        type="submit"
                                        onClick={handleSubmit}
                                    >
                                        提交表單
                                </Button>
                                </Grid>
                            </FormControl>
                        </Container>
                    </Paper> : <SignUpSuccess application={application} />}
            </Container>
    );
}

export default EventRegistration;