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
import SignUpSuccess from '../components/SignUpSuccess';
import { Link } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { GET_EVENTHOST_QUERY, CREATE_FORM_MUTATION } from '../graphql';

// const API_ROOT = 'http://localhost:5000/';
// const instance = axios.create({
//     baseURL: API_ROOT
// });

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    form: {
        marginTop: "20px",
        width: "inherit"
    },
    fromItemTitle: {
        marginTop: "10px",
        marginBottom: "10px",
    },
    formItemSubtitle: {
        fontSize: "75%",
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
    const [studentID, setStudentID] = useState("");
    const [department, setDepartment] = useState("");
    const [notableResult, setNotableResult] = useState("");
    const [lastFiveDigit, setLastFiveDigit] = useState("");
    const [transactionTime, setTransactionTime] = useState("");
    const [transactionName, setTransactionName] = useState("");
    const [information, setInformation] = useState("");
    const [otherInformation, setOtherInformation] = useState("");

    const { loading, error, data } = useQuery(GET_EVENTHOST_QUERY, { variables: { event_id: props.match.params.eventID } });
    if (error) console.log(error);
    console.log(data);

    const [newApplication] = useMutation(CREATE_FORM_MUTATION);

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
                    phone: applicantPhone,
                    studentID: studentID,
                    department: department,
                    notableResult: notableResult,
                    lastFiveDigit: lastFiveDigit,
                    transactionTime: transactionTime,
                    transactionName: transactionName,
                    information: information,
                    otherInformation: otherInformation,
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

        // const { data: success } = await instance.post('forms/newApplication', {
        //     application
        // })
        var isSuccess = true;
        try {
            await newApplication({
                variables: {
                    event_id: props.match.params.eventID,
                    applicant: {
                        name: applicantName,
                        gender: gender,
                        birthday: birthday,
                        email: email,
                        phone: applicantPhone,
                        studentID: studentID,
                        department: department,
                        notableResult: notableResult,
                        lastFiveDigit: lastFiveDigit,
                        transactionTime: transactionTime,
                        transactionName: transactionName,
                        information: information,
                        otherInformation: otherInformation,
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
            })
        } catch (e) {
            // console.log(e.networkError.result.errors); // here you can see your network
            console.log(e);
            isSuccess = false;
        }

        if (isSuccess) {
            setSuccess(true);
            alert("報名成功！");
        } else {
            alert("報名失敗！請再試一次");
        }

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
                            <Typography className={classes.fromItemTitle}>名字</Typography>
                            <TextField required label="Name" variant="outlined"
                                value={applicantName}
                                onInput={e => setApplicantName(e.target.value)}
                            />
                        </Grid>
                        <Grid>
                            <Typography className={classes.fromItemTitle}>學號</Typography>
                            <TextField required label="Student ID" variant="outlined"
                                value={studentID}
                                onInput={e => setStudentID(e.target.value)}
                            />
                        </Grid>
                        <Grid>
                            <Typography className={classes.fromItemTitle}>系級</Typography>
                            <TextField required label="Department and Grade" variant="outlined"
                                value={department}
                                onInput={e => setDepartment(e.target.value)}
                            />
                        </Grid>
                        <Grid>
                            <Typography className={classes.fromItemTitle}>Email</Typography>
                            <TextField required label="Email" variant="outlined"
                                value={email}
                                onInput={e => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid>
                            <Typography className={classes.fromItemTitle}>聯絡電話</Typography>
                            <TextField required label="Phone" variant="outlined"
                                value={applicantPhone}
                                onInput={e => setApplicantPhone(e.target.value)}
                            />
                        </Grid>
                        <Grid>
                            <Typography className={classes.fromItemTitle}>得知比賽資訊來源 Where you acquired the information of this tournament</Typography>
                            <RadioGroup required aria-label="information" name="information"
                                value={information}
                                onChange={e => setInformation(e.target.value)}
                            >
                                <FormControlLabel value="fb" control={<Radio />} label="台大校網粉專 FB" />
                                <FormControlLabel value="friends" control={<Radio />} label="朋友告知 Friends" />
                                <FormControlLabel value="others" control={<Radio />}
                                    label={<TextField id="standard-basic" label="其他"
                                        value={otherInformation}
                                        onInput={e => setOtherInformation(e.target.value)}
                                    />} />
                            </RadioGroup>
                        </Grid>
                        <Grid>
                            <Typography className={classes.fromItemTitle}>歷屆最佳成績（無參賽經驗者填無）</Typography>
                            <Typography className={classes.formItemSubtitle}>e.g.2018新生盃八強，或在外比賽皆可</Typography>
                            <TextField fullWidth required label="Notable results" variant="outlined"
                                value={notableResult}
                                onInput={e => setNotableResult(e.target.value)}
                            />
                        </Grid>
                        <Grid>
                            <Typography className={classes.fromItemTitle}>匯款帳號末五碼</Typography>
                            <TextField fullWidth required label="The last five digits of your account number" variant="outlined"
                                value={lastFiveDigit}
                                onInput={e => setLastFiveDigit(e.target.value)}
                            />
                        </Grid>
                        <Grid>
                            <Typography className={classes.fromItemTitle}>大約匯款時間</Typography>
                            <TextField fullWidth required label="Approximate time of transaction" variant="outlined"
                                value={transactionTime}
                                onInput={e => setTransactionTime(e.target.value)}
                            />
                        </Grid>
                        <Grid>
                            <Typography className={classes.fromItemTitle}>匯款人姓名</Typography>
                            <TextField required label="Remitter's name" variant="outlined"
                                value={transactionName}
                                onInput={e => setTransactionName(e.target.value)}
                            />
                        </Grid>
                        {/* <Grid>
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
                                    value={birthday}
                                    onInput={e => setBirthday(e.target.value)}
                                />
                            </Grid> */}
                        {/* <Grid>
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
                            </Grid> */}
                        {/* <Grid>
                                <Typography className={classes.fromItemTitle}>參賽組別</Typography>
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
                            </Grid> */}
                        {/* <Grid>
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
                            </Grid> */}
                        <Grid>
                            <Button className={classes.submitBut} variant="contained" color="default"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                提交表單
                                </Button>
                        </Grid>
                    </Container>
                </Paper> : <SignUpSuccess
                    bankInfo={data.getEventHost}
                    application={application} />}
        </Container>
    );
}

export default EventRegistration;