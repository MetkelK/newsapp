import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';

function SearchResults(props){
	const { searchresults, searchedArticlesLoaded, searchCompleted } = props;
	
	const [show, setShow] = useState(searchedArticlesLoaded ? false : true);

  	const handleClose = () => {
  		setShow(false);
  		searchCompleted();
  	}
  	
	useEffect(() => {
		if (searchedArticlesLoaded) {
			setShow(true);
		} else {
			setShow(false);
		}
	}, [searchedArticlesLoaded])

	if(searchedArticlesLoaded) {
		return(
			<React.Fragment>
				<Modal show={show} onHide={handleClose} size="xl" >
					<Modal.Header closeButton className="modalheader">
	          			<Modal.Title>Search Results</Modal.Title>
	        		</Modal.Header>
					<CardColumns className="p-3">
						{searchresults.map(result => (
							<Card key={result._id} className="p-2 text-center">
							<a href={result.web_url} target="_blank" rel="noopener noreferrer">
								{(result.multimedia.length > 0) ? <Card.Img src={"http://www.nytimes.com/" + result.multimedia[0].url} alt="alt" className="p-1"/> : null}
								<Card.Title className="mb-3">{result.headline.main}</Card.Title>
					 			<Card.Subtitle className="mb-1">{result.byline.original}</Card.Subtitle>
					 			<Card.Text className="mb-2">{result.abstract}</Card.Text>
					 			<Card.Text className="mb-2">{result.source}</Card.Text>
					 		</a>
							</Card>
						))}
					</CardColumns>
				</Modal>
			</React.Fragment>
		)
	} else {
		return null;
	}
}

export default SearchResults;