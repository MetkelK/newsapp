import React, { useState } from 'react';
import Display from './Display';
import Controls from './Controls';

function Carousel(props){
	const [ current, setCurrent ] = useState(0);

	const handlePreviousClick = () => {
		const previous = current - 1
		setCurrent((previous < 0) ? props.data.length - 1 : previous)
	}

	const handleNextClick = () => {
		const next = current + 1
		setCurrent((next === props.data.length) ? 0 : next)
	}

	const handleSlideClick = (index) => {
		console.log(current)
		console.log(index)

		if (current !== index) {
			setCurrent(index)
		}
	}

	const { heading, data } = props
	const headingId = `slider-heading__${heading.replace(/\s+/g, '-').toLowerCase()}`
	const wrapperTransform = {
      'transform': `translateX(-${current * (100 / data.length)}%)`
    }

	return(
			<div className='slider' aria-labelledby={headingId}>
				<ul className="slider__wrapper" style={wrapperTransform}>
				
					{data.map((slide, index) => {
						return(
							<Display
								key={slide.uri}
				                slide={slide}
				                current={current}
				                handleSlideClick={handleSlideClick}
				                index={index}
							/>
						)
					})}
				</ul>

				<div className="slider__controls">
					<Controls 
		            	type="previous"
		            	title="Go to previous slide"
		            	handleClick={handlePreviousClick}
		          	/>
		          
		          	<Controls 
		            	type="next"
		            	title="Go to next slide"
		            	handleClick={handleNextClick}
		          	/>
	          	</div>
          	</div>
	)
}

export default Carousel;