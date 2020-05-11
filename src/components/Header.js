import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const Header = ({ user, logout }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {/* <Link to="/blogs">Blogs</Link> */}
          </Typography>
          <Typography variant="h6" className={classes.title}>
            {/* <Link to="/users">Users</Link> */}
          </Typography>
          <Typography variant="h6" className={classes.title}>
            {user.name} logged in
          </Typography>
          <button color="inherit" id="logout-button" onClick={logout}>
            Logout
          </button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
