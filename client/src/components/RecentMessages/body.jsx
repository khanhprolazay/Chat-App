import Nav from './nav';
import Item from './item';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FriendSlice } from 'slices/FriendSlice';
import ConversationApi from 'api/ConversationApi';
import { useSelector, useDispatch } from 'react-redux';
import { uidSelector, currentConversationSelector } from 'selectors';

function Body({ socket }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const uid = useSelector(uidSelector);
	const cid = useSelector(currentConversationSelector);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		ConversationApi.getUserConversations(uid)
			.then((res) => setConversations(res))
			.catch((err) => {
				console.log('Error at RecentActivityBody: ', err);
				navigate('/error', { state: { status: 500 } });
			});
	}, [uid]);

	// Make an event to receiver conversation from server
	// When user acceppt an invitation
	useEffect(() => {
		socket.on('receive_conversation', ({ conversation, friend }) => {
			dispatch(FriendSlice.actions.add(friend));
			setConversations([...conversations, conversation]);
		});

		socket.on('receive_message_recent', (message) => {
			const update = conversations.map((conversation) =>
				conversation.cid === message.conversation_id
					? {
							...conversation,
							lasted_message_content: message.content,
							lasted_message_time: message.created_at,
					  }
					: conversation
			);

			const index = update.findIndex(
				(conv) => conv.cid === message.conversation_id
			);
			if (!cid || cid !== message.conversation_id) {
				update.unshift(update.splice(index, 1)[0]);
				updateChecked(message.conversation_id, false);
			}

			if (cid === message.conversation_id)
				updateChecked(message.conversation_id, true);

			setConversations(update);
		});
		return () => {
			socket.off('receive_message_recent');
			socket.off('receive_conversation');
		};
	}, [socket, conversations, cid]);

	const updateChecked = (cid, value) => {
		dispatch(
			FriendSlice.actions.updateChecked({
				cid: cid,
				value: value,
			})
		);
	};

	return (
		<div>
			<Nav />
			<div>
				{conversations.map((conversation) => {
					return (
						<Item
							socket={socket}
							conversation={conversation}
							current={cid}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Body;
