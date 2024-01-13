import { useEffect, useState } from 'react';

const imageToURL = (file) => {
	let blob = null;

	if (file.type === 'image/png') {
		blob = new Blob([file], { type: file.type });
		return URL.createObjectURL(blob);
	}
	// Array buffer
	const data = file.type === 'Buffer' ? file.data : new Uint8Array(file);
	blob = new Blob([new Uint8Array(data)], {
		type: file.type,
	});
	return URL.createObjectURL(blob);
};

function Item({ message, user, friend }) {
	const date = new Date(message.created_at);
	const content = message.content.split('\n');
	const [imageURL, setImageURL] = useState('');
	const owner = message.sender_id === user.uid ? user : friend;

	const style = message.image ? {} : { paddingBottom: `12px` };
	const layout =
		message.sender_id === user.uid
			? [
					{ backgroundColor: 'var(--boxchat-white-color)' },
					{ flexDirection: 'row-reverse' },
					{ textAlign: 'end' },
			  ]
			: [{}, {}, {}];

	useEffect(() => {
		if (message.image)
			setImageURL(imageToURL(message.image.data));

		// Clean up the URL when the component is unmounted
		return () => URL.revokeObjectURL(imageURL);
	}, [message]);

	return !owner ? (
		<div></div>
	) : (
		<div
			className='mainpage-boxchat-item-container'
			style={layout[1]}>
			<div>
				<img
					src={owner.image.link}
					alt=''
				/>
			</div>
			<div style={layout[0]}>
				<div style={layout[1]}>
					<h4>{owner.display_name}</h4>
					<p>{`${date.getHours()}:${date.getMinutes()}`}</p>
				</div>
				<div style={style}>
					{content.map((mess) => {
						return <p style={layout[2]}>{mess}</p>;
					})}
					{imageURL === '' ? null : (
						<div>
							<img
								src={imageURL}
								alt=''
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Item;
