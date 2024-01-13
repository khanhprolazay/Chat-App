import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPhone,
	faVideo,
	faUsersViewfinder,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { CurrentSlice } from 'slices/CurrentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { personalGroupSelector, participantSelector, currentConversationSelector } from 'selectors';

function Header() {
	const dispatch = useDispatch();
	const cid = useSelector(currentConversationSelector);
	const friend = useSelector(participantSelector(cid));
	const personalGroup = useSelector(personalGroupSelector);

	return (
		<div>
			{!friend ? null : (
				<React.Fragment>
					<div className='mainpage-boxchat-avatar'>
						<div>
							<img
								src={friend.image.link ? friend.image.link : friend.image.data}
								alt=''
							/>
							<div></div>
						</div>
						<div>
							<h3>{friend.display_name}</h3>
							<p>Online</p>
						</div>
					</div>
					<div className='mainpage-boxchat-options'>
						{personalGroup === 'group' ? (
							<div>
								<FontAwesomeIcon
									icon={faUsersViewfinder}
									onClick={() => dispatch(CurrentSlice.actions.setTab(7))}
								/>
							</div>
						) : null}
						<div>
							<FontAwesomeIcon icon={faPhone} />
						</div>
						<div>
							<FontAwesomeIcon icon={faVideo} />
						</div>
					</div>
				</React.Fragment>
			)}
		</div>
	);
}

export default Header;
