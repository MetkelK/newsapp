import React, { Component } from "react";
import "./App.css";

/*Material UI Components*/
import MostViewed from "./Components/MostViewed";
import SearchResults from "./Components/SearchResults";
import TopStories from "./Components/TopStories";
import Navbar from "./Components/Navbar";
import Container from "@material-ui/core/Container";

/*New York Times API Endpoints*/
const NYT_SEVENDAYVIEW_URL =
  "https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?";
const NYT_TOPSTORIES_URL =
  "https://api.nytimes.com/svc/topstories/v2/home.json?";
const NYT_SEARCH_URL =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sevenDayMostViewedArticles: [],
      sevenDayArticlesisLoaded: false,
      topStoriesArticles: [],
      topStoriesisLoaded: false,
      searchedArticles: [],
      searchedArticlesLoaded: false,
      query: "",
    };
  }

  componentDidMount() {
    this.getArticles();
  }

  getArticles() {
    fetch(`${NYT_SEVENDAYVIEW_URL}api-key=${process.env.REACT_APP_NYT_API_KEY}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          sevenDayMostViewedArticles: res.results,
          sevenDayArticlesisLoaded: true,
        });
      })
      .catch((err) => console.log(err));
    fetch(`${NYT_TOPSTORIES_URL}api-key=${process.env.REACT_APP_NYT_API_KEY}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          topStoriesArticles: res.results,
          topStoriesisLoaded: true,
        });
      })
      .catch((err) => console.log(err));
  }

  handleSearch = (e) => {
    this.setState({
      query: e.target.value,
    });
  };

  searchArticles = (e) => {
    e.preventDefault();
    fetch(
      `${NYT_SEARCH_URL}${this.state.query}&api-key=${process.env.REACT_APP_NYT_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          searchedArticles: res.response.docs,
          searchedArticlesLoaded: true,
        });
      })
      .catch((err) => console.log(err));
  };

  searchCompleted = () => {
    this.setState({ searchedArticles: [], searchedArticlesLoaded: false });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar
          handleSearch={this.handleSearch}
          searchArticles={this.searchArticles}
        ></Navbar>
        <div className="headlines">
          <TopStories
            topstories={this.state.topStoriesArticles}
            topstoriesLoaded={this.state.topStoriesisLoaded}
          />
        </div>
        <Container>
          <MostViewed
            mostviewed={this.state.sevenDayMostViewedArticles}
            mostviewedLoaded={this.state.sevenDayArticlesisLoaded}
          />
        </Container>
        <Container>
          <SearchResults
            searchresults={this.state.searchedArticles}
            searchedArticlesLoaded={this.state.searchedArticlesLoaded}
            searchCompleted={this.searchCompleted}
          />
        </Container>
        <p style={{ textAlign: "center", margin: "1rem 0" }}>
          Data provided by{" "}
          <a
            href="https://www.nytimes.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            The New York Times
          </a>
        </p>
      </React.Fragment>
    );
  }
}

export default App;
