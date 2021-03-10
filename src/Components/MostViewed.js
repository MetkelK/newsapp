import React from "react";

/*Material UI Components*/
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

/*Material UI Styles*/
import { makeStyles } from "@material-ui/core/styles";

/*Material UI Media Query*/
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles({
  gridList: {
    width: "100%",
    height: "auto",
    transform: "translateZ(0)",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  icon: {
    color: "#FFF",
  },
});

function MostViewed(props) {
  const { mostviewed, mostviewedLoaded } = props;

  const classes = useStyles();

  const matches = useMediaQuery("(min-width:960px)");

  if (mostviewedLoaded) {
    return (
      <div className={classes.root}>
        <GridList cellHeight="auto" className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div" align="center">
              Most Viewed Articles of The Week
            </ListSubheader>
          </GridListTile>
          {mostviewed.map((result, index) => {
            if (result.media.length > 0)
              return (
                <GridListTile key={index} cols={matches ? 1 : 2}>
                  <img
                    src={result.media[0]["media-metadata"][2].url}
                    alt={result.media[0].caption}
                  />
                  <GridListTileBar
                    title={result.title}
                    subtitle={<span>{result.byline}</span>}
                    actionIcon={
                      <IconButton
                        aria-label={`info about ${result.title}`}
                        className={classes.icon}
                      >
                        <a
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <InfoIcon />
                        </a>
                      </IconButton>
                    }
                  />
                </GridListTile>
              );
            return null;
          })}
        </GridList>
      </div>
    );
  } else {
    return null;
  }
}

export default MostViewed;
