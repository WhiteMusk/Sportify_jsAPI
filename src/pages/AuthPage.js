import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
// import { FormattedMessage } from 'react-intl';
import { useMutation } from '@apollo/client';

import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { logIn, logInByGoogle } from "../redux/actions";
import Navbar from '../components/Navbar';
import { ADD_HOST_MUTATION, LOGIN_CHECK_MUTATION } from '../graphql';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    appBarSpacer: theme.mixins.toolbar,
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    googleButton: {
        marginBottom: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main
    },
}));

function AuthPage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const userData = useSelector(state => state.auth.userData);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({ 'username': '', 'email': '', 'password': '', 'confirmPassword': '' });

    const [addHost] = useMutation(ADD_HOST_MUTATION);
    const [loginCheck] = useMutation(LOGIN_CHECK_MUTATION);

    // Redirect to manage page after login
    useEffect(() => {
        if (userData) {
            history.push(`/manage/${userData.profile._id}/all`);
        }
    }, [userData]);

    // Handle normal sign up / login
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSignUp) {
            let isSuccess = true;
            let host = null;
            try {
                host = await addHost({
                    variables: {
                        name: formData.username,
                        email: formData.email,
                        password: formData.password,
                        confirmPassword: formData.confirmPassword
                    }
                })
                // console.log(host);
            } catch (e) {
                console.log(e.networkError.result.errors); // here you can see your network
                isSuccess = false;
            }

            if (isSuccess && host.data.addHost) {
                dispatch(logIn({ profile: host.data.addHost }));
            } else {
                alert("?????????????????????????????????????????????????????????");
            }
        } else { // Login
            let isSuccess = true;
            let host = null;
            try {
                host = await loginCheck({
                    variables: {
                        email: formData.email,
                        password: formData.password
                    }
                })
            } catch (e) {
                console.log(e.networkError.result.errors); // here you can see your network
                isSuccess = false;
            }

            if (isSuccess && host.data.loginCheck) {
                dispatch(logIn({ profile: host.data.loginCheck }));
            } else {
                alert("??????????????????????????????");
            }
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const switchMethod = () => {
        setIsSignUp(!isSignUp);
    }

    const handleGoogleLoginSuccess = async (res) => {
        console.log(res);
        const profile = res?.profileObj;
        const token = res?.tokenId;
        try { //TODO: Add to database for sign up and check for login
            dispatch(logInByGoogle({ profile, token }));
            // Direct to home page
            // history.push('/');
        } catch (err) {
            console.log(err);
        }
    };

    const handleGoogleLoginFailure = (error) => {
        console.log(error);
    };

    return (
        <>
            <Navbar />
            <Container component="main" maxWidth="xs" className={classes.container}>
                <div className={classes.appBarSpacer} />
                <Paper className={classes.paper} elevation={3}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {isSignUp ? 'Sign Up' : 'Log In'}
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {isSignUp &&
                                <TextField name="username" onChange={handleInputChange} label="Username" type="text" variant="outlined" required fullWidth autoFocus></TextField>
                            }
                            <TextField name="email" onChange={handleInputChange} label="Email Address" type="email" variant="outlined" required fullWidth autoFocus></TextField>
                            <TextField name="password" onChange={handleInputChange} label="Password" type="password" variant="outlined" required fullWidth></TextField>
                            {isSignUp &&
                                <TextField name="confirmPassword" onChange={handleInputChange} label="Confirm Password" type="password" variant="outlined" required fullWidth></TextField>
                            }
                        </Grid>
                        <Button className={classes.submit} type="submit" variant="contained" color="primary" fullWidth >
                            {isSignUp ? 'Sign Up' : 'Log In'}
                        </Button>
                        <GoogleLogin
                            clientId="394019166466-c0nvqp8tino8j0eko00esq27q2fme85b.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained">
                                    {isSignUp ? 'Sign Up' : 'Log In'} with Google
                                </Button>
                            )}
                            onSuccess={handleGoogleLoginSuccess}
                            onFailure={handleGoogleLoginFailure}
                            cookiePolicy="single_host_origin"
                        />
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={switchMethod}>
                                    {isSignUp ?
                                        'Already have an account? Log In' :
                                        'Don\'t have an account? Sign Up'
                                    }
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default AuthPage;