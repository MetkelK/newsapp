import React from 'react';
import '../App.css';
import '../bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

function TopStories(props) {
	const { topstories, topstoriesLoaded } = props;

	if (topstoriesLoaded) {
		return (
			<React.Fragment>
				<Carousel>
					{topstories.map(result => (
						<Carousel.Item key={result.uri} className="p-5">
							<a href={result.url} target="_blank" rel="noopener noreferrer">
								<Container >
									<img className="img-fluid"  src={result.multimedia[0].url} alt={result.multimedia[0].caption} />
								</Container>
								<Carousel.Caption className="overlay text-dark">
								 	<h5>{result.title}</h5>
							      	<p>{result.byline}</p>
								</Carousel.Caption>
							</a>
						</Carousel.Item>
					))}
				</Carousel>
			</React.Fragment>
		);
	} else {
		  return null;
	}
}

export default TopStories;