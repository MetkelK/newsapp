import React from 'react';
import '../App.css';
import '../bootstrap.css';
import background from '../generic.jpg';
import Carousel from 'react-bootstrap/Carousel';

function Headlines(props) {
	const { headlines, headlinesLoaded } = props;

	if (headlinesLoaded){
		return (
			<React.Fragment>
				<Carousel className="background">
					{headlines.map(result => (
						<Carousel.Item key={result.id} className="p-5">
							<a href={result.url} target="_blank" rel="noopener noreferrer">
		   						{(result.media.length > 0) ? <img className="d-block w-100" src={result.media[0]["media-metadata"][2].url} alt={result.media[0].caption} /> : <img className="d-block w-100" src={background} alt="background"/>}
							    <Carousel.Caption className="overlay text-dark">
							      <h5>{result.title}</h5>
							      <p>{result.byline}</p>
							      <p>{result.source}</p>
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

export default Headlines;