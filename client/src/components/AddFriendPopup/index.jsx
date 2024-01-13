import 'css/AddFriendPopup.css';
import Spinner from '../Spinner';
import UserApi from 'api/UserApi';
import { uidSelector } from 'selectors';
import { useNavigate } from 'react-router-dom';
import { CurrentSlice } from 'slices/CurrentSlice';
import { useSelector, useDispatch } from 'react-redux';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useState, useTransition } from 'react';

function AddFriendPopup({ socket }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const uid = useSelector(uidSelector);
	const [users, setUsers] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [filterText, setFilterText] = useState('');
	const [isPending, setIsPending] = useState(false);
	const [isSearching, startTransition] = useTransition();

	const setTab = (tab) => dispatch(CurrentSlice.actions.setTab(tab));
	const close = (e) => {
		if (e.target.id === 'mainpage-addfriendpopup-container') {
			setTab(0);
		}
	};

	// Call api for initial data for users
	useEffect(() => {
		setIsPending(true);
		UserApi.getUnfriends(uid)
			.then((res) => setUsers(res))
			.catch(() => navigate('/error', { state: { status: 500 } }))
			.finally(() => setIsPending(false));
	}, [uid]);

	const usersRemaining = useMemo(() => {
		if (filterText === '') return users;
		return users.filter((user) =>
			user.username.toLowerCase().includes(filterText.toLowerCase())
		);
	}, [filterText, users]);

	const onSearchTextChange = (e) => {
		setSearchText(e.target.value);
		startTransition(() => setFilterText(e.target.value));
	};

	const onAddFriendClick = (e) => {
		socket.emit('send_invitation', e.target.id);
	};

	return (
		<div
			id='mainpage-addfriendpopup-container'
			className='popup-container'
			onClick={(e) => close(e)}>
			<div className='mainpage-addfriendpopup-form'>
				<div>
					<h2>Thêm bạn</h2>
					<FontAwesomeIcon
						icon={faXmark}
						style={{ width: '18px', height: '18px' }}
						onClick={() => setTab(0)}
					/>
				</div>
				<input
					type='text'
					placeholder='Tìm bạn'
					value={searchText}
					onChange={(e) => onSearchTextChange(e)}
				/>
				<div>
					{isSearching || isPending ? (
						<Spinner
							width={50}
							height={50}
						/>
					) : (
						<ul>
							{usersRemaining.map((user) => {
								return (
									<li className='addfriendpopup-item'>
										<div>
											<img
												src={
													user.image.link ? user.image.link : user.image.data
												}
												alt=''
											/>
											<div>
												<h4>{user.display_name}</h4>
												<p>{user.phone}</p>
											</div>
										</div>
										<button
											id={user.uid}
											onClick={(e) => onAddFriendClick(e)}>
											Kết bạn
										</button>
									</li>
								);
							})}
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

export default AddFriendPopup;
