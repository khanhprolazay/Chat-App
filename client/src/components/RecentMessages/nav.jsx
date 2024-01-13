import { personalGroupSelector } from 'selectors';
import { CurrentSlice } from 'slices/CurrentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function Nav() {
	const dispatch = useDispatch();
	const state = useSelector(personalGroupSelector);

	// Change conversation type on the RecentMessage nav: Personal or Group
	const setState = (value) => {
		dispatch(CurrentSlice.actions.setPersonalOrGroup(value));
	};

	useEffect(() => {
		const radio = document.getElementById('mainpage-recentactivity-' + state);
		radio.checked = true;
	}, [state]);

	return (
		<nav>
			<input
				type='radio'
				name='mainpage-recentactivity-tab'
				id='mainpage-recentactivity-personal'
				defaultChecked={true}
			/>
			<input
				type='radio'
				name='mainpage-recentactivity-tab'
				id='mainpage-recentactivity-group'
			/>
			<label
				htmlFor='mainpage-recentactivity-personal'
				className='mainpage-recentactivity-personal'
				onClick={() => setState('personal')}>
				Chat
			</label>
			<label
				htmlFor='mainpage-recentactivity-group'
				className='mainpage-recentactivity-group'
				onClick={() => setState('group')}>
				Groups
			</label>
			<div className='mainpage-recentactivity-tab'></div>
		</nav>
	);
}

export default Nav;
