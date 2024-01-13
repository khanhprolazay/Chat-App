import { randomColor } from '../utils';

function CircleAvatarLinear(props) {
	const color_1 = randomColor();
	const color_2 = randomColor();

	const style = {
		width: '45px',
		height: '45px',
		border: '3px solid transparent',
		borderRadius: '80px',
		backgroundImage: `linear-gradient(white, white), linear-gradient(#${color_1}, #${color_2})`,
		backgroundOrigin: 'border-box',
		backgroundClip: 'content-box, border-box',
		zIndex: '3',
	};

	return (
		<div style={style}>
			<img
				src={props.url}
				alt=''
				style={{ borderRadius: '80px', width: '45px', height: '45px' }}
			/>
		</div>
	);
}

export default CircleAvatarLinear;
