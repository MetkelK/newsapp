import React from 'react';
import '../App.css';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  imageWrapper:{
    backgroundColor: ' #1d1f2f',
    borderRadius: '1%',
    height: '100%',
    left: '0%',
    overflow: 'hidden',
    position: 'absolute',
    top: '0%',
    width: '100%',
    // transition: transform calc('600ms' / 4) cubicBezier(0.25, 0.46, 0.45, 0.84),
  },
  slide__image:{
    height: '110%',
    left: '-5%',
    objectFit: 'cover',
    opacity: '0',
    pointerEvents: 'none',
    position: 'absolute',
    top: '-5%',
    width: '110%',
    // transition: opacity '600ms' cubicBezier(0.25, 0.46, 0.45, 0.84), transform '600ms' cubicBezier(0.25, 0.46, 0.45, 0.84),
  },
  slide__content:{
    opacity: '0',
    padding: '4vmin',
    position: 'absolute',
    bottom: '0',
    width: '90%',
    visibility: 'hidden',
    // transition: transform calc('600ms' / 4) cubicBezier(0.25, 0.46, 0.45, 0.84),
  },
  slide__headline:{
    fontSize: '3vmin',
    fontWeight: '600',
    position: 'relative',
    color: '#FFF',
  },
  slide__abstract:{
    fontSize: '2vmin',
    fontWeight: '600',
    position: 'relative',
  },
  button:{
    display: "flex",
    justifyContent: "center",
    width: "100%",
  }
})

function Display(props){
  const classes = useStyles();
	const slide = React.createRef()

	const handleMouseMove = (event) => {
		const el = slide.current
	    const r = el.getBoundingClientRect()

	    el.style.setProperty('--x', event.clientX - (r.left + Math.floor(r.width / 2)))
	    el.style.setProperty('--y', event.clientY - (r.top + Math.floor(r.height / 2)))
	}

	const handleMouseLeave = (event) => {    
    	slide.current.style.setProperty('--x', 0)
    	slide.current.style.setProperty('--y', 0)
  	}

	const handleSlideClick = (event) => {
		props.handleSlideClick(props.index)
	}
	
  	const imageLoaded = (event) => {
    	event.target.style.opacity = "1"
    	console.log(event.target.style.opacity)
  	}

	const { abstract, title, url, multimedia } = props.slide
	const current = props.current
    let classNames = 'slide'

    if (current === props.index) classNames += ' slide--current'
    else if (current - 1 === props.index) classNames += ' slide--previous'
    else if (current + 1 === props.index) classNames += ' slide--next'

	return(
		<li 
        ref={slide}
        className={classNames} 
        onClick={handleSlideClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      	>
      		

        <Card className={classes.imageWrapper}>
          <CardActionArea>
            <CardMedia className={classes.slide__image}
              component="img"
              src={multimedia[0].url}
              alt={multimedia[0].caption}
              onLoad={imageLoaded}
            >
            </CardMedia>
            <CardContent className={classes.content}>
              <Typography className={classes.slide__headline} gutterBottom variant="h6" >
                      {title}
                  </Typography>
                  <Typography className={classes.slide__abstract} variant="body2" color="textSecondary" component="p">
                    {abstract}
                    </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" className={classes.button}> 
                <a href={url} target="_blank" rel="noopener noreferrer">
                    Read More
                </a>
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>
    </li>
	)
}

export default Display;