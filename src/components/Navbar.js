import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setLocale, logIn, logOut } from '../redux/actions';
import { FormattedMessage } from 'react-intl';
import { LOCALE_OPTIONS } from '../i18n/locale-settings';

function Navbar() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    return (
        <AppBar position="fixed" style={{ zIndex: 1201 }}>
            <Toolbar>
                <Button color="inherit" component={Link} to="/">
                    <FormattedMessage id="app.title" />
                </Button>
                {/* Show ManageEvents link if user is logged in, else show Services link */
                    isLoggedIn ?
                        <Button color="inherit" component={Link} to="/manage/60719d96ccb9eb6520edba71/all">
                            <FormattedMessage id="navbar.manageEvents" />
                        </Button> :
                        <Button color="inherit" component={Link} to="/about">
                            <FormattedMessage id="navbar.about" />
                        </Button>
                }
                <div style={{ flexGrow: 1 }}></div>
                <Button color="inherit" onClick={() => dispatch(setLocale(LOCALE_OPTIONS.zh))}>中文</Button>
                <Button color="inherit" onClick={() => dispatch(setLocale(LOCALE_OPTIONS.en))}>English</Button>
                {/* Show log out button if user is currently logged in, and vice versa */
                    isLoggedIn ?
                        <>
                            <Button color="inherit" component={Link} to="/manage/60719d96ccb9eb6520edba71/organizerInfo">
                                <FormattedMessage id="organizerInfo" />
                            </Button>
                            <Button color="inherit" component={Link} to="/" onClick={() => dispatch(logOut())}>
                                <FormattedMessage id="logout" />
                            </Button>
                        </>
                        :
                        <Button color="inherit" component={Link} to="/manage/60719d96ccb9eb6520edba71/all" onClick={() => dispatch(logIn())}>
                            <FormattedMessage id="login" />
                        </Button>
                }
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;