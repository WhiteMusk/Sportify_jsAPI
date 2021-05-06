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
import { useMediaQuery } from 'react-responsive'
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InfoIcon from '@material-ui/icons/Info';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import SearchBox from "./SearchBox"

function NavbarH(props) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const dispatch = useDispatch();
    // const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const userData = useSelector(state => state.auth.userData);

    return (
        <AppBar position="fixed" style={{ zIndex: 1201 }}>
            {!isTabletOrMobile ?
                <Toolbar>
                    <Button color="inherit" component={Link} to="/">
                        <FormattedMessage id="app.title" />
                    </Button>
                    <SearchBox searchChange={props.searchChange} />
                    <div style={{ flexGrow: 1 }}></div>
                    {/* Show ManageEvents link if user is logged in, else show Services link */
                        userData ?
                            <Button color="inherit" component={Link} to={`/manage/${userData.profile._id}/all`}>
                                <FormattedMessage id="navbar.manageEvents" />
                            </Button> :
                            <Button color="inherit" component={Link} to="/about">
                                <FormattedMessage id="navbar.about" />
                            </Button>
                    }
                    <Button color="inherit" onClick={() => dispatch(setLocale(LOCALE_OPTIONS.zh))}>中文</Button>
                    <Button color="inherit" onClick={() => dispatch(setLocale(LOCALE_OPTIONS.en))}>ENGLISH</Button>
                    {/* Show log out button if user is currently logged in, and vice versa */
                        userData ?
                            <>
                                <Button color="inherit" component={Link} to={`/manage/${userData.profile._id}/organizerInfo`}>
                                    <FormattedMessage id="navbar.hostInfo" />
                                </Button>
                                <Button color="inherit" component={Link} to="/" onClick={() => dispatch(logOut())}>
                                    <FormattedMessage id="logout" />
                                </Button>
                            </>
                            :
                            <Button color="inherit" component={Link} to="/auth">
                                <FormattedMessage id="login" />
                            </Button>

                    }
                </Toolbar> :
                <Toolbar>

                    <IconButton color="inherit" component={Link} to="/">
                        <SportsTennisIcon />
                    </IconButton>
                    {/* Show ManageEvents link if user is logged in, else show Services link */
                        userData ?
                            <IconButton color="inherit" component={Link} to={`/manage/${userData.profile._id}/all`}>
                                <DashboardIcon />
                            </IconButton> :
                            <IconButton color="inherit" component={Link} to="/about">
                                <InfoIcon />
                            </IconButton>
                    }
                    <div style={{ flexGrow: 1 }}></div>
                    <IconButton size='small' color="inherit" onClick={() => dispatch(setLocale(LOCALE_OPTIONS.zh))}>CH</IconButton>
                    <IconButton size='small' color="inherit" onClick={() => dispatch(setLocale(LOCALE_OPTIONS.en))}>EN</IconButton>
                    {/* Show log out button if user is currently logged in, and vice versa */
                        userData ?
                            <>
                                <IconButton color="inherit" component={Link} to={`/manage/${userData.profile._id}/organizerInfo`}>
                                    <ContactMailIcon />
                                </IconButton>
                                <IconButton size='small' color="inherit" component={Link} to="/" onClick={() => dispatch(logOut())}>
                                    <ExitToAppIcon />
                                </IconButton>
                            </>
                            :
                            <IconButton size='small' color="inherit" component={Link} to="/auth">
                                <FormattedMessage id="login" />
                            </IconButton>
                    }

                </Toolbar>
            }
        </AppBar>
    );
}

export default NavbarH;