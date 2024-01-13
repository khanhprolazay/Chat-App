import { useLocation } from 'react-router-dom';
import InternalError from '../assets/images/InternalError.png';
import NotFoundError from '../assets/images/NotFoundError.png';

const style = {
	borderRadius: '20px',
	width: '50%',
	height: '75%',
};

function ErrorPage() {
	const location = useLocation();
	const status = location.state ? location.state.status : 404;

	return (
		<div className='error-container'>
			{(() => {
				switch (status) {
					case 404:
						return (
							<img
								src={NotFoundError}
								style={{ ...style, height: '70%' }}
							/>
						);
					default:
						return (
							<img
								src={InternalError}
								style={style}
							/>
						);
				}
			})()}
		</div>
	);
}

export default ErrorPage;
