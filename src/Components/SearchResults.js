import React, { useState, useEffect } from 'react';

/*Material UI Components*/
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';

/*Material UI Styles*/
import { makeStyles } from '@material-ui/core/styles';

/*Material UI Media Query*/
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
	title: {
		margin: 0,
    	padding: theme.spacing(2),
	},
	closeButton: {
	    position: 'absolute',
	    right: theme.spacing(1),
	    top: theme.spacing(1),
	    color: theme.palette.grey[500],
  	},
  	root: {
	    display: 'flex',
	    flexWrap: 'wrap',
	    justifyContent: 'space-around',
	    overflow: 'hidden',
	},
	gridList: {
    	width: '100%',
    	height: 'auto',
    	transform: 'translateZ(0)',
  	},
  	icon: {
    	color: '#FFF',
  	},
}));

function SearchResults(props){
	const { searchresults, searchedArticlesLoaded, searchCompleted } = props;
	
	const [open, setOpen] = useState(false);

	const handleClose = () => {
	    setOpen(false);
	    searchCompleted();
	};

	useEffect(() => {
		if (searchedArticlesLoaded) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [searchedArticlesLoaded])

	const classes = useStyles();

	const matches = useMediaQuery('(min-width:960px)');

	if (searchedArticlesLoaded) {
		return (
			<div>	
		      	<Dialog
			        open={open}
			        onClose={handleClose}
			        aria-labelledby="alert-dialog-title"
			        aria-describedby="alert-dialog-description"
			        fullWidth
			        maxWidth='lg'
			        fullScreen={matches ? false : true}
		      	>
			        <DialogTitle id="alert-dialog-title" disableTypography className={classes.title}>
			        	<Typography variant="h6">Search Results</Typography>
			        	<IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
			          		<CloseIcon />
			        	</IconButton>
			        </DialogTitle>
			        <DialogContent>
			        	<div className={classes.root}>
							<GridList cellHeight='auto' className={classes.gridList} >
								{searchresults.map((result, i) => (
									<GridListTile key={result._id} cols={matches ? 1 : 2}>
										{(result.multimedia.length > 0) ? <img 
											src={"http://www.nytimes.com/" + result.multimedia[0].url}
											alt='alt'
										/> : null }
										<GridListTileBar
											title={result.headline.main}
							              	subtitle={<span>{result.byline.original}</span>}
							              	actionIcon={
								            <IconButton aria-label={`info about ${result.title}`} className={classes.icon}>
								                <a href={result.web_url} target="_blank" rel="noopener noreferrer"><InfoIcon /></a>
								            </IconButton>
							            }
							            />
							        </GridListTile>
								))}
							</GridList>
						</div>
			        </DialogContent>
      			</Dialog>
			</div>	
		);
	} else {
		return null;
	}
	
}

export default SearchResults;