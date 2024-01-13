import Item from './item';
import { useRef, useEffect } from 'react';
import notMessge from '../../assets/images/notMessage.png';

const style = {
	alignItems: 'center',
	justifyContent: 'space-around',
};

function Box({ messages, user, friend }) {
	const ref = useRef();

	useEffect(() => {
		if (ref.current) {
			ref.current.scrollTop = ref.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div
			className='mainpage-boxchat-box'
			ref={ref}
			style={!messages.length ? style : {}}>
			{!messages.length ? (
				<img
					src={notMessge}
					alt=''
					style={{ width: '60%', height: '60%' }}
				/>
			) : (
				messages.map((message) => {
					return (
						<Item
							user={user}
							friend={friend}
							message={message}
						/>
					);
				})
			)}
		</div>
	);
}

export default Box;
