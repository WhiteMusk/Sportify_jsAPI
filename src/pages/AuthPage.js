import { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { GoogleLogin } from 'react-google-login';
import { FormattedMessage } from 'react-intl';

import { logIn } from "../redux/actions";
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({'email': '', 'password': '', 'confirmPassword': ''});

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
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
        try {
            dispatch(logIn({ profile, token }));
        } catch(err) {
            console.log(err);
        }
    };

    const handleGoogleLoginFailure = (error) => {
        console.log(error);
    };

    return (
        <Container component="main" maxWidth="xs" className={classes.container}>
            <div className={classes.appBarSpacer} />
            <Paper className={classes.paper} elevation={3}>
                <Typography gutterBottom variant="h5" component="h2">
                    {isSignUp ? 'Sign Up' : 'Log In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <TextField name="email" onChange={handleInputChange} label="Email Address" type="email" variant="outlined" required fullWidth autoFocus></TextField>
                        <TextField name="password" onChange={handleInputChange} label="Password" type="password" variant="outlined" required fullWidth></TextField>
                        { isSignUp &&
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
                                { isSignUp ?
                                    'Already have an account? Log In' :
                                    'Don\'t have an account? Sign Up'
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default AuthPage;