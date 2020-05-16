import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const Header = ({ user, logout }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      // flexGrow: 1,
      paddingRight: "16px",
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/blogs">Blogs</Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link to="/users">Users</Link>
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
