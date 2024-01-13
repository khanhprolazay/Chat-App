import UserApi from 'api/UserApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InvitationSlice } from 'slices/InvitationSlice';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useState, useEffect, useId } from 'react';

function Item({ invitation, setIsPending, socket }) {
	const dispatch = useDispatch();
	const [infor, setInfor] = useState(null);

	console.log(infor);

	useEffect(() => {
		UserApi.findById(invitation.sender_id)
			.then((res) => setInfor(res))
			.catch((err) => console.log(err));
	}, []);

	const decline = () => {
		setIsPending(true);
		UserApi.declineInvitation(invitation)
			.then(() => {
				setIsPending(false);
				dispatch(InvitationSlice.actions.remove(invitation));
			})
			.catch((err) => console.log(err));
	};

	const accept = () => {
		socket.emit('accept_invitation', invitation);
		dispatch(InvitationSlice.actions.remove(invitation));
	};

	return !infor ? null : (
		<li className='notification-item'>
			<div>
				<img
					src={infor.image.link ? infor.image.link : infor.image.data}
					alt=''
				/>
				<div>
					<h4>{infor.display_name}</h4>
					<p>{infor.phone}</p>
				</div>
			</div>
			<div>
				<FontAwesomeIcon
					icon={faXmark}
					style={{ width: '16px', height: '16px', color: 'red' }}
					onClick={() => decline()}
				/>
				<FontAwesomeIcon
					icon={faCheck}
					style={{
						width: '16px',
						height: '16px',
						color: 'green',
					}}
					onClick={() => accept()}
				/>
			</div>
		</li>
	);
}

export default Item;
