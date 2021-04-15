import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

function Navbar({ setLocale }) {
  return (
    <AppBar position="fixed" style={{ zIndex: 1201 }}>
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Sportify</Button>
        <div style={{ flexGrow: 1 }}></div>
        <Button color="inherit" onClick={() => setLocale('zh-Hant')}>中文</Button>
        <Button color="inherit" onClick={() => setLocale('en')}>English</Button>
        <Button color="inherit">
          <FormattedMessage id="login" />
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;