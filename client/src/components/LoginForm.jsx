import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import AuthApi from 'api/AuthApi';
import Spinner from 'components/Spinner';
import { UserSlice } from 'slices/UserSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LoginForm(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [err, setErr] = useState('');
	const setIsLogin = props.setIsLogin;
	const [isPending, setIsPending] = useState(false);
	const [information, setInformation] = useState({
		username: '',
		password: '',
	});

	const login = () => {
		setIsPending(true);
		AuthApi.login(information.username, information.password)
			.then((res) => {
				dispatch(UserSlice.actions.set(res));
				navigate('/');
			})
			.catch((err) => {
				console.log(err);
				setErr(err.data);
				setIsPending(false);
			});
	};

	return (
		<div className='loginpage-form-container'>
			<div>
				<h1>
					Welcome <span>Back!</span>
				</h1>
				<input
					type='text'
					required
					placeholder='Username'
					value={information.username}
					onChange={(e) =>
						setInformation({ ...information, username: e.target.value })
					}
				/>
				<input
					type='password'
					required
					placeholder='Password'
					value={information.password}
					onChange={(e) =>
						setInformation({ ...information, password: e.target.value })
					}
				/>
			</div>
			<div>
				<p>Forgot your password?</p>
				<div onClick={() => login()}>
					<p>Sign in</p>
					<div>
						<FontAwesomeIcon icon={faAngleRight} />
					</div>
				</div>
				{isPending ? (
					<div
						className='loginpage-with'
						style={{ marginTop: '10px' }}>
						<Spinner
							width={25}
							height={25}
						/>
					</div>
				) : (
					<div className='loginpage-with'>
						<div>
							<div className='loginpage-line'></div>
							<p>Or sign in with</p>
							<div className='loginpage-line'></div>
						</div>
						<div>
							<img
								src='https://cdn.pixabay.com/photo/2015/05/17/10/51/facebook-770688_960_720.png'
								alt=''
							/>
							<img
								src='https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-twitter-social-media-round-icon-png-image_6315985.png'
								alt=''
							/>
							<img
								src='https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227'
								alt=''
							/>
						</div>
						<p onClick={() => setIsLogin(false)}>
							Don't have an account? <span>Sign up</span>
						</p>
						<p>{err}</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default LoginForm;
