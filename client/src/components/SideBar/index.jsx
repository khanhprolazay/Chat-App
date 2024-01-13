import 'css/SideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faComments,
	faPeopleGroup,
	faTv,
	faUserPlus,
	faBell,
	faGear,
	faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import AuthApi from 'api/AuthApi';
import React, { useEffect } from 'react';
import { UserSlice } from 'slices/UserSlice';
import { FriendSlice } from 'slices/FriendSlice';
import { CurrentSlice } from 'slices/CurrentSlice';
import { useSelector, useDispatch } from 'react-redux';
import { InvitationSlice } from 'slices/InvitationSlice';
import {
	uidSelector,
	numberInvitationSelector,
	currentTabSelector,
} from 'selectors';

const tabs = [
	'chat',
	'media',
	'group',
	'addfriend',
	'chat',
	'chat',
	'chat',
	'chat',
];

function SideBar({ socket }) {
	const dispatch = useDispatch();
	const uid = useSelector(uidSelector);
	const currentTab = useSelector(currentTabSelector);
	const count = useSelector(numberInvitationSelector);

	// Receive invitation from server.
	// This will change the number of notifications on the bell
	useEffect(() => {
		socket.on('receive_invitation', ({ invitation }) => {
			dispatch(InvitationSlice.actions.add(invitation));
		});
		return () => {
			socket.off('receive_message');
			socket.off('receive_invitation');
		};
	}, [socket]); // [socket, count]

	useEffect(() => {
		const radio = document.getElementById(
			'mainpage-sidebar-' + tabs[currentTab]
		);
		radio.checked = true;
	}, [currentTab]);

	const setCurrentTab = (tab) => {
		dispatch(CurrentSlice.actions.setTab(tab));
	};

	function logout() {
		socket.emit('client_disconnect');
		AuthApi.logout(uid)
			.catch((err) => console.log(err))
			.finally(() => {
				dispatch(UserSlice.actions.delete());
				dispatch(CurrentSlice.actions.reset());
				dispatch(FriendSlice.actions.delete());
				dispatch(InvitationSlice.actions.delete());
			});
	}

	// Header Body Footer
	return (
		<div className='mainpage-sidebar-container'>
			<div></div>
			<div>
				<nav>
					<input
						type='radio'
						name='mainpage-sidebar-tab'
						id='mainpage-sidebar-chat'
					/>
					<input
						type='radio'
						name='mainpage-sidebar-tab'
						id='mainpage-sidebar-media'
					/>
					<input
						type='radio'
						name='mainpage-sidebar-tab'
						id='mainpage-sidebar-group'
					/>
					<input
						type='radio'
						name='mainpage-sidebar-tab'
						id='mainpage-sidebar-addfriend'
					/>
					<label
						htmlFor='mainpage-sidebar-chat'
						className='mainpage-sidebar-chat'
						onClick={() => setCurrentTab(0)}>
						<FontAwesomeIcon icon={faComments} />
					</label>
					<label
						htmlFor='mainpage-sidebar-media'
						className='mainpage-sidebar-media'
						onClick={() => setCurrentTab(1)}>
						<FontAwesomeIcon icon={faTv} />
					</label>
					<label
						htmlFor='mainpage-sidebar-group'
						className='mainpage-sidebar-group'
						onClick={() => setCurrentTab(2)}>
						<FontAwesomeIcon icon={faPeopleGroup} />
					</label>
					<label
						htmlFor='mainpage-sidebar-addfriend'
						className='mainpage-sidebar-addfriend'
						onClick={() => setCurrentTab(3)}>
						<FontAwesomeIcon icon={faUserPlus} />
					</label>
					<div className='mainpage-sidebar-tab'></div>
				</nav>
				<div></div>
				<div className='mainpage-sidebar-bottom'>
					<div id='notification'>
						<FontAwesomeIcon
							icon={faBell}
							onClick={() => setCurrentTab(4)}
						/>
						{count > 0 ? <div>{count}</div> : null}
					</div>
					<div>
						<FontAwesomeIcon
							icon={faGear}
							onClick={() => setCurrentTab(5)}
						/>
					</div>
					<div onClick={() => setCurrentTab(6)}>
						<img
							src='https://static.wikia.nocookie.net/youtubia-viet-nam/images/d/d0/MB3R.jpg/revision/latest?cb=20220107075011&path-prefix=vi'
							alt=''
						/>
					</div>
					<div>
						<FontAwesomeIcon
							onClick={() => logout()}
							icon={faArrowRightFromBracket}
						/>
					</div>
				</div>
			</div>
			<div></div>
		</div>
	);
}

export default React.memo(
	SideBar,
	(pre, nex) => pre.socket.id !== nex.socket.id
);
