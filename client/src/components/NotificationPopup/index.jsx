import 'css/NotificationPopup.css';
import Item from './item';
import Spinner from 'components/Spinner';
import { CurrentSlice } from 'slices/CurrentSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { invitationSelector } from 'selectors';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

function NotificationPopup({ socket }) {
	const dispatch = useDispatch();
	const [isPending, setIsPending] = useState(false);
	const invitations = useSelector(invitationSelector);

	const setTab = (tab) => {
		dispatch(CurrentSlice.actions.setTab(tab));
	};

	const close = (e) => {
		if (e.target.id === 'mainpage-addfriendpopup-container') 
			setTab(0);
	};

	return (
		<div
			id='mainpage-addfriendpopup-container'
			className='popup-container'
			onClick={(e) => close(e)}>
			<div className='mainpage-addfriendpopup-form'>
				<div>
					<h2>Lời mời kết bạn</h2>
					<FontAwesomeIcon
						icon={faXmark}
						onClick={() => setTab(0)}
						style={{ width: '18px', height: '18px' }}
					/>
				</div>
				<input style={{ display: 'none' }} />
				<div style={{ marginTop: '0px' }}>
					{isPending ? (
						<Spinner
							width={50}
							height={50}
						/>
					) : (
						<ul>
							{invitations.map((invitation) => (
								<Item
									socket={socket}
									invitation={invitation}
									setIsPending={setIsPending}
								/>
							))}
						</ul>
					)}
				</div>
				<div>
					<button onClick={() => setTab(0)}>Hủy</button>
					<button>Tìm kiếm</button>
				</div>
			</div>
		</div>
	);
}

export default NotificationPopup;
