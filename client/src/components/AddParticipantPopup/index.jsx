import Spinner from '../Spinner';
import data from './data';
import { useState, useTransition, useMemo, useId } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import 'css/AddParticipantPopup.css';
import { useDispatch } from 'react-redux';
import { CurrentSlice } from 'slices/CurrentSlice';

function AddPartitipantPopup() {
	const dispatch = useDispatch();
	const [filterText, setFilterText] = useState('');
	const [searchText, setSearchText] = useState('');
	const [isPending, startTrasition] = useTransition();

	const friendList = useMemo(() => {
		if (filterText === '') return data;

		const result = [];
		data.forEach((element) => {
			if (element.display_name.toLowerCase().includes(filterText.toLowerCase()))
				result.push(element);
		});
		return result;
	}, [filterText]);

	const closePopupEvent = (e) => {
		if (e.target.id === 'container') {
			setTab(0);
		}
	};

	const setTab = (tab) => {
		dispatch(CurrentSlice.actions.setTab(tab));
	};

	const onInputChange = (e) => {
		setSearchText(e.target.value);
		startTrasition(() => setFilterText(e.target.value));
	};

	return (
		<div
			className='popup-container'
			id='container'
			onClick={(e) => closePopupEvent(e)}>
			<div className='mainpage-addparticipant-form'>
				<div>
					<h2>Thêm thành viên</h2>
					<FontAwesomeIcon
						icon={faXmark}
						onClick={() => setTab(0)}
					/>
				</div>
				<input
					type='text'
					placeholder='Search...'
					value={searchText}
					onChange={(e) => onInputChange(e)}
				/>
				<div>
					{isPending ? (
						<Spinner
							width={49}
							height={49}
						/>
					) : (
						<ul>
							{friendList.map((friend) => {
								return (
									<li
										className='addparticipant-item'
										key={useId()}>
										<div>
											<img
												src={friend.avatar_image}
												alt=''
											/>
											<h3>{friend.display_name}</h3>
										</div>
										<input type='checkbox' />
									</li>
								);
							})}
						</ul>
					)}
				</div>
				<div>
					<button onClick={() => setTab(0)}>Hủy</button>
					<button>Thêm</button>
				</div>
			</div>
		</div>
	);
}

export default AddPartitipantPopup;
