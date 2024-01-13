import 'css/Carousel.css';
import Slider from 'infinite-react-carousel';
import carousel1 from '../assets/images/carousel1.png';
import carousel2 from '../assets/images/carousel2.png';
import carousel3 from '../assets/images/carousel3.png';
import carousel4 from '../assets/images/carousel4.png';

function Carousel() {
	return (
		<Slider
			rows={1}
			duration={800}
			arrows={false}
			autoplay={true}
			className={'full'}
			autoplaySpeed={2500}>
			<div>
				<img
					src={carousel1}
					className='carousel-image'
					alt=''
				/>
			</div>
			<div>
				<img
					src={carousel2}
					className='carousel-image'
					alt=''
				/>
			</div>
			<div>
				<img
					src={carousel3}
					className='carousel-image'
					alt=''
				/>
			</div>
			<div>
				<img
					src={carousel4}
					className='carousel-image'	
					alt=''
				/>
			</div>
		</Slider>
	);
}

export default Carousel;
