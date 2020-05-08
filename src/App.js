import React, { Component } from 'react';
import './App.css';
import './bootstrap.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Headlines from './Components/Headlines';
import MostViewed from './Components/MostViewed';
import SearchResults from './Components/SearchResults';

const NYT_SEVENDAYVIEW_URL = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?'
const NYT_ONEDAYVIEW_URL = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?'
const NYT_SEARCH_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='
const NYT_API_KEY = 'aqpnJpm3rvYEu7e4nYv4iu3vuvpmXKIe'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sevenDayMostViewedArticles: [],
      sevenDayArticlesisLoaded: false,
      oneDayMostViewedArticles: [],
      oneDayArticlesisLoaded: false,
      searchedArticles: [],
      searchedArticlesLoaded: false,
      query: ''
    };
  }

  componentDidMount(){
    this.getArticles();
  }

  getArticles(){
    fetch(`${NYT_SEVENDAYVIEW_URL}api-key=${NYT_API_KEY}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ sevenDayMostViewedArticles: res.results, sevenDayArticlesisLoaded: true})
      })
      .catch(err => console.log(err));
    fetch(`${NYT_ONEDAYVIEW_URL}api-key=${NYT_API_KEY}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ oneDayMostViewedArticles: res.results, oneDayArticlesisLoaded: true})
      })
      .catch(err => console.log(err));
  }

  handleSearch = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  searchArticles = (e) => {
    e.preventDefault();
    fetch(`${NYT_SEARCH_URL}${this.state.query}&api-key=${NYT_API_KEY}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ searchedArticles: res.response.docs, searchedArticlesLoaded: true})
      })
      .catch(err => console.log(err));
  }

  searchCompleted = () => {
    this.setState({ searchedArticles: [], searchedArticlesLoaded: false });
  } 

  render() {
    return (
      <React.Fragment>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="mb-2">
          <Navbar.Brand>The New York Times</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Form inline onSubmit={this.searchArticles}>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" name="query" value={this.state.query} onChange={this.handleSearch}/>
                <Button type="submit" onClick={this.searchArticles}>Submit</Button >
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <section>
          <div className="skewed"></div>
        </section>
        <Container className="d-none d-sm-block mb-1">
          <Headlines headlines={this.state.oneDayMostViewedArticles} headlinesLoaded={this.state.oneDayArticlesisLoaded} />
        </Container>
        <Container className="text-center">
          <MostViewed mostviewed={this.state.sevenDayMostViewedArticles} mostviewedLoaded={this.state.sevenDayArticlesisLoaded}/>
        </Container>
        <Container>
          <SearchResults searchresults={this.state.searchedArticles} searchedArticlesLoaded={this.state.searchedArticlesLoaded} searchCompleted={this.searchCompleted}/>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
