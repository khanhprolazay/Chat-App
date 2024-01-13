import 'css/SomethingWentWrong.css';
import { useDispatch } from 'react-redux';
import { CurrentSlice } from 'slices/CurrentSlice';
import Image from '../assets/images/SomethingWentWrong.png'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SomethingWentWrong() {
	const dispatch = useDispatch();

	const setError = (value) =>
		dispatch(CurrentSlice.actions.setError(value));
	const close = (e) => {
		if (e.target.id === 'somethingwrong-container') setError(false);
	};

	return (
		<div
			className='popup-container'
			id='somethingwrong-container'
			onClick={(e) => close(e)}>
			<div className='somethingwrong-form'>
        <img src={Image} alt=''/>
				<p>SOMETHING WENT WRONG</p>
				<p>PLEASE TRY AGAIN</p>
				<FontAwesomeIcon icon={faXmark} onClick={() => setError(false)}/>
      </div>
		</div>
	);
}

export default SomethingWentWrong;
