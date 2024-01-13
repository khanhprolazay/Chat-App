import 'css/BoxChat.css';
import Box from './box';
import Input from './input';
import Header from './header';
import MessageApi from 'api/MessageApi';
import Spinner from 'components/Spinner';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { CurrentSlice } from 'slices/CurrentSlice';
import { useSelector, useDispatch } from 'react-redux';
import {
	userSelector,
	currentConversationSelector,
	participantSelector,
} from 'selectors';

const style = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-around',
};

function BoxChat({ socket }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector(userSelector);
	const [messages, setMessages] = useState([]);
	const [isPending, setIsPending] = useState(false);
	const cid = useSelector(currentConversationSelector);
	const friend = useSelector(participantSelector(cid));

	// Call api to get the conversation messages
	useEffect(() => {
		setIsPending(true);
		MessageApi.getConversationMessage(cid)
			.then((res) => {
				res.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)); 
				setMessages(res);
			})
			.catch((err) => {
				console.log('Error at BoxChat: ', err);
				navigate('/error', { state: { status: 500 } });
			})
			.finally(() => setIsPending(false));
	}, [cid]);

	// Event to receive message and error
	useEffect(() => {
		socket.on('receive_message_box', (message) => {
			if (cid === message.conversation_id) {
				socket.emit('check_conversation', friend.uid);
				setMessages((messages) => [...messages, message]);
			}
		});

		socket.on('create_message_error', () => {
			messages.pop();
			setMessages((messages) => [...messages]);
			dispatch(CurrentSlice.actions.setError(true));
		});
		return () => {
			socket.off('receive_message_box');
			socket.off('create_message_error');
		};
	}, [socket, messages]);

	return !cid ? (
		<div></div>
	) : (
		<div className='mainpage-boxchat-container'>
			<Header />
			{isPending ? (
				<div style={style}>
					<Spinner
						width={70}
						height={70}
					/>
				</div>
			) : (
				<Box
					user={user}
					friend={friend}
					messages={messages}
				/>
			)}
			<Input
				uid={user.uid}
				socket={socket}
				messages={messages}
				conversation_id={cid}
				friend_id={friend.uid}
				setMessages={setMessages}
			/>
		</div>
	);
}

export default React.memo(BoxChat, (pre, nex) => {
	return pre.socket.id !== nex.socket.id;
});
