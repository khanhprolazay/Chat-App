import { FriendSlice } from 'slices/FriendSlice';
import { CurrentSlice } from 'slices/CurrentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { isCheckedSelector, participantSelector } from 'selectors';

function Item({ conversation, socket, current }) {
	const dispatch = useDispatch();
	const date = new Date(conversation.lasted_message_time);
	const isChecked = useSelector(isCheckedSelector(conversation.cid));
	const participant = useSelector(participantSelector(conversation.cid));

	const style_1 = {
		backgroundColor:
			conversation.cid === current ? 'white' : 'var(--small-background-color)',
	};
	const style_2 = { fontWeight: isChecked ? 500 : 700 };

	// Change conversation if user click on the list conversations (RecentMessages)
	const onClick = () => {
		dispatch(CurrentSlice.actions.setConversation(conversation.cid));
		if (!isChecked) {
			dispatch(
				FriendSlice.actions.updateChecked({
					cid: conversation.cid,
					value: true,
				})
			);
			socket.emit('check_conversation', participant.uid);
		}
	};

	return !participant ? (
		<div></div>
	) : (
		<div
			className='mainpage-recentmessages-item-container'
			style={style_1}
			onClick={() => onClick()}>
			<div>
				<img
					src={
						participant.image.link
							? participant.image.link
							: participant.image.data
					}
					alt=''
				/>
				<div></div>
			</div>
			<div>
				<div>
					<h4>{participant.display_name}</h4>
					<p style={style_2}>{`${date.getHours()}:${date.getMinutes()}`}</p>
				</div>
				<p style={style_2}>{conversation.lasted_message_content}</p>
			</div>
			{participant.is_checked ? null : <div></div>}
		</div>
	);
}

export default Item;
