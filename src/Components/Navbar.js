import React from "react";

/*Material UI Components*/
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

/*Material UI Styles*/
import { fade, makeStyles } from "@material-ui/core/styles";

/*Material UI Function*/
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

function ElevationScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    color: trigger ? "inherit" : "transparent",
  });
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    border: "1px solid #000",
    borderRadius: "20px",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Navbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ElevationScroll {...props}>
        <AppBar position="fixed" color="transparent">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              The New York Times
            </Typography>
            <form className={classes.search} onSubmit={props.searchArticles}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={props.handleSearch}
                inputProps={{ "aria-label": "Search" }}
              />
            </form>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </div>
  );
}

export default Navbar;
