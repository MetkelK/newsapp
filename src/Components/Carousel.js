import React from "react";

/*Material UI Styles*/
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    height: "stretch",
    width: "100%",
  },
  horizontalCenter: {
    display: "flex",
    justifyContent: "center",
    margin: "0 auto",
    maxWidth: "25rem",
  },
  carouselContainer: {
    position: "relative",
    overflow: "hidden",
  },
  carouselContainerInner: {
    display: "flex",
    overflowX: "scroll",
    scrollSnapType: "x mandatory",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "& > * ": {
      scrollSnapAlign: "center",
      flex: "0 0 auto",
    },
  },
});

function Carousel({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.horizontalCenter}>
        <div className={classes.carouselContainer}>
          <div className={classes.carouselContainerInner}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
