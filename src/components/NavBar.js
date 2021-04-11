import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <AppBar position="fixed" style={{ zIndex: 1201 }}>
      <Toolbar>
        <Button color="inherit"
          component={NavLink} to="/"
        >
          Sportify
        </Button>
        <div style={{ flexGrow: 1 }}></div>
        <Button color="inherit">登入</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;