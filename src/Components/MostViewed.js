import React from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';

function MostViewed(props) {
	const { mostviewed, mostviewedLoaded } = props;

	if(mostviewedLoaded){
		return(
			<React.Fragment>
				<CardColumns>
				{mostviewed.map(result => (
					<Card key={result.id}>
						{(result.media.length > 0) ? <Card.Img className="p-1" src={result.media[0]["media-metadata"][2].url} alt={result.media[0].caption} /> : null}
						<Card.Body>
				 			<Card.Title className="mb-3">{result.title}</Card.Title>
				 			<Card.Subtitle className="mb-1">{result.byline}</Card.Subtitle>
				 			<Card.Text className="mb-2">{result.abstract}</Card.Text>
				 			<Card.Link href={result.url} target="_blank" rel="noopener noreferrer">{result.source}</Card.Link>
			 			</Card.Body>
			 		</Card>
					))}
				</CardColumns>
			</React.Fragment>
		);
	} else {
		  return null;
	}
}

export default MostViewed;