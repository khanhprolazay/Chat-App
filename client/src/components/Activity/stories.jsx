import data from './data';
import { useId } from 'react';
import CircleAvatarLinear from '../CircleAvatarLinear';

const style = {
	display: 'flex',
	alignItems: 'center',
	paddingLeft: '5px',
};

function Stories() {

	return (
		<div className='mainpage-activity-stories'>
			<h3>Stories</h3>
			<div>
				{data.map((item) => {
					return (
						<div style={style}>
							<CircleAvatarLinear url={item.url} />
							<h5>{item.name}</h5>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Stories;
