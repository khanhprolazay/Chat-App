import 'css/CreateGroupPopup.css';
import data from './data';
import Spinner from 'components/Spinner';
import { useDispatch } from 'react-redux';
import { CurrentSlice } from 'slices/CurrentSlice';
import { useState, useMemo, useTransition, useId } from 'react';

const url = 'https://www.slotdevils.com/images/teams/no_image_team.png';

function CreateGroupPopup() {
	const dispatch = useDispatch();
	const [image, setImage] = useState(null);
	const [groupName, setGroupName] = useState('');
	const [searchText, setSearchText] = useState('');
	const [filterText, setFilterText] = useState('');
	const [isPending, startTransition] = useTransition();

	const onSearchTextChange = (e) => {
		setSearchText(e.target.value);
		startTransition(() => setFilterText(e.target.value));
	};

	const close = (e) => {
		if (e.target.id === 'create-group-popup') {
			dispatch(CurrentSlice.actions.setTab(0));
		}
	};

	const onImageChange = (e) => {
		if (e.target.files.length !== 0) {
			setImage(e.target.files[0]);
		}
	};

	const listFriend = useMemo(() => {
		if (filterText === '') return data;
		const result = [];
		data.forEach((friend) => {
			if (friend.display_name.toLowerCase().includes(filterText.toLowerCase()))
				result.push(friend);
		});
		return result;
	}, [filterText]);

	console.log(isPending);

	return (
		<div
			className='popup-container'
			id='create-group-popup'
			onClick={(e) => close(e)}>
			<div className='mainpage-creategrouppopup-form'>
				<div>
					<h2>Tạo nhóm</h2>
				</div>
				<div>
					<label htmlFor='creategroup-fileinput'>
						{image ? (
							<img
								src={URL.createObjectURL(image)}
								alt=''
							/>
						) : (
							<img
								src={url}
								alt=''
							/>
						)}
					</label>
					<input
						id='creategroup-fileinput'
						type='file'
						accept='image/*'
						onChange={(e) => onImageChange(e)}
					/>
					<input
						type='text'
						placeholder='Group name...'
						value={groupName}
						onChange={(e) => setGroupName(e.target.value)}
					/>
				</div>
				<input
					type='text'
					placeholder='Search friend...'
					value={searchText}
					onChange={(e) => onSearchTextChange(e)}
				/>
				<div>
					{isPending ? (
						<Spinner
							width={49}
							height={49}
						/>
					) : (
						<ul>
							{listFriend.map((friend) => {
								return (
									<li className='creategroup-item'>
										<input type='checkbox' />
										<img
											src={friend.avatar_image}
											alt=''
										/>
										<h4>{friend.display_name}</h4>
									</li>
								);
							})}
						</ul>
					)}
				</div>
				<div>
					<button onClick={() => dispatch(CurrentSlice.actions.setTab(0))}>
						Hủy
					</button>
					<button>Tạo</button>
				</div>
			</div>
		</div>
	);
}

export default CreateGroupPopup;
