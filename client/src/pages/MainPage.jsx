import 'css/MainPage.css';
import UserApi from 'api/UserApi';
import io from 'socket.io-client';
import BoxChat from 'components/BoxChat';
import SideBar from 'components/SideBar';
import Spinner from 'components/Spinner';
import Carousel from 'components/Carousel';
import Activity from 'components/Activity';
import { useNavigate } from 'react-router-dom';
import { FriendSlice } from 'slices/FriendSlice';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RecentMessages from 'components/RecentMessages';
import AddFriendPopup from 'components/AddFriendPopup';
import { InvitationSlice } from 'slices/InvitationSlice';
import { uidSelector, currentSelector } from 'selectors';
import CreateGroupPopup from 'components/CreateGroupPopup';
import NotificationPopup from 'components/NotificationPopup';
import ProfileConfigPopup from 'components/ProfileConfigPopup';
import SomethingWentWrong from 'components/SomethingWentWrong';
import AddParitipantPopup from 'components/AddParticipantPopup';

function MainPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const uid = useSelector(uidSelector);
	const current = useSelector(currentSelector);
	const [isPending, setIsPending] = useState(true);

	const [socket, setSocket] = useState(
		io('http://localhost:5000', {
			cors: false,
			autoConnect: false, // Important
			query: { uid: uid },
		})
	);

	useEffect(() => {
		if (!socket.connected) {
			socket.connect();
			setSocket(socket);
		}
		socket.on('connect_error', () => navigate('/error', { state: { status: 500 } }));
		// ComponentWillUnmount => Disconnect to socket server
		return () => {
			socket.off('connect_error');
			socket.disconnect();
		};
	}, [uid, socket]);

	useEffect(() => {
		// If the uid change
		// 1. If id is exited in Redux => user has logged in
		// 2. else => user does not logg in => redirect user to logout
		if (!uid) return navigate('/login');

		const promises = [
			UserApi.getFriends(uid)
				.then((res) => dispatch(FriendSlice.actions.set(res)))
				.catch((err) => {
					throw err;
				}),

			UserApi.getInvitations(uid)
				.then((res) => dispatch(InvitationSlice.actions.set(res)))
				.catch((err) => {
					throw err;
				}),
		];

		Promise.all(promises)
			.catch((err) => {
				console.log('Error at MainPage: ', err);
				navigate('/error', { state: { status: 500 } });
			})
			.finally(() => setIsPending(false));
	}, [uid]);

	const style = !current.cid
		? {
				gridTemplateColumns: '0.65fr 2.2fr 6.27fr',
		  }
		: {
				gridTemplateColumns: '0.65fr 2.2fr 5.17fr 1.1fr',
		  };

	return isPending ? (
		<div className='waiting-container'>
			<Spinner
				width={75}
				height={75}
			/>
		</div>
	) : (
		<div
			className='mainpage-container'
			style={style}>
			{!uid ? null : (
				<React.Fragment>
					<SideBar socket={socket} />
					<RecentMessages socket={socket} />

					{!current.cid ? (
						<Carousel />
					) : (
						<React.Fragment>
							<BoxChat socket={socket} />
							<Activity socket={socket} />
						</React.Fragment>
					)}
					{current.error ? <SomethingWentWrong /> : null}
					{(() => {
						switch (current.tab) {
							case 2:
								return <CreateGroupPopup />;
							case 3:
								return <AddFriendPopup socket={socket} />;
							case 4:
								return <NotificationPopup socket={socket} />;
							case 6:
								return <ProfileConfigPopup />;
							case 7:
								return <AddParitipantPopup />;
							default:
								return null;
						}
					})()}
				</React.Fragment>
			)}
		</div>
	);
}

export default MainPage;
