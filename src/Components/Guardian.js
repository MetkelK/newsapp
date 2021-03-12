import React from "react";

import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

/*Material UI Styles*/
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: "1rem",
  },
  pos: {
    marginBottom: 12,
  },
});

function Guardian(props) {
  const { guardianArticles, guardianArticlesLoaded } = props;

  const classes = useStyles();

  if (guardianArticlesLoaded) {
    return (
      <Container>
        {guardianArticles.map((article, index) => (
          <Card className={classes.root} key={index}>
            <CardContent>
              <Typography>{article.webTitle}</Typography>
              <Typography className={classes.pos}>
                {article.webPublicationDate}
              </Typography>
              <Button>
                <a
                  href={article.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </Container>
    );
  } else {
    return null;
  }
}

export default Guardian;
