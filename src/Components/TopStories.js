import React from "react";

/*Material UI Components*/
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Carousel from "react-material-ui-carousel";

/*Material UI Styles*/
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    overflowX: "hidden",
    width: "100%",
  },
  img: {
    maxHeight: "50vh",
    marginBottom: "0.5rem",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
});

function Item(props) {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <CardMedia
            className={classes.img}
            image={props.result.multimedia[0].url}
            title={props.result.multimedia[0].caption}
            component="img"
          />
          <Typography gutterBottom variant="h6" align="left">
            {props.result.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" align="left">
            {props.result.abstract}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button className={classes.button} size="medium">
          <a href={props.result.url} target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </Button>
      </CardActions>
    </Card>
  );
}

function TopStories(props) {
  const { topstories, topstoriesLoaded } = props;

  const classes = useStyles();

  if (topstoriesLoaded) {
    return (
      <Container className={classes.root}>
        <Carousel
          autoPlay={true}
          animation="fade"
          indicators={false}
          navButtonsAlwaysVisible={true}
          interval={5500}
        >
          {topstories.map((result, i) => (
            <Item result={result} key={i} />
          ))}
        </Carousel>
      </Container>
    );
  } else {
    return null;
  }
}

export default TopStories;
