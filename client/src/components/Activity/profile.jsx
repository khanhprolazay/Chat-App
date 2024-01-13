import { currentConversationSelector, participantSelector } from 'selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import images from './images.js';
import React from 'react';


function Profiles() {
	const style = {
		zIndex: '3',
		margin: '5px',
		width: '50px',
		height: '50px',
		borderRadius: '15px',
		backgroundOrigin: 'border-box',
		border: '2px solid transparent',
		backgroundClip: 'content-box, border-box',
		backgroundImage: `linear-gradient(white, white), linear-gradient(to right, #FFC266, #EA06E1)`,
	};
	const cid = useSelector(currentConversationSelector);
	const friend = useSelector(participantSelector(cid));

	return !friend ? <div></div> : 
	(
		<div className='mainpage-activity-profile'>
					<h3>Profile</h3>
					<div>
						<div style={style}>
							<img
								src={friend.image.link ? friend.image.link : friend.image.data}
								alt=''
							/>
							<div></div>
						</div>
						<h5>{friend.display_name}</h5>
						<p>@_Manlikeope</p>
					</div>
					<div>
						<div>
							<h5>Media</h5>
							<FontAwesomeIcon icon={faAngleRight} />
						</div>
						<div>
							{images.map((image) => (
								<img
									src={image}
									alt=''
								/>
							))}
						</div>
					</div>
				
			
		</div>
	);
}

export default Profiles;
