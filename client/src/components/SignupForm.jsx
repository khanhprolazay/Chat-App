import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'components/Spinner';
import { useState } from 'react';
import AuthApi from 'api/AuthApi';

function SignupForm(props) {
	const setIsLogin = props.setIsLogin;
	const [err, setErr] = useState('');
	const [isPending, setIsPending] = useState(false);
	const [information, setInformation] = useState({
		username: '',
		password: '',
		repassword: '',
	});

	const onSignup = () => {
		setIsPending(true);
		AuthApi.signUp(
			information.username,
			information.password,
			information.repassword
		)
			.then((res) => {
				setIsLogin(true);
				setIsPending(false);
			})
			.catch((err) => {
				console.log(err)
				setErr(err.data);
				setIsPending(false);
			});
	};

	return (
		<div className='loginpage-form-container'>
			<div>
				<h1>
					Sign <span>Up!</span>
				</h1>
				<input
					type='text'
					required
					placeholder='Username'
					onChange={(e) =>
						setInformation({ ...information, username: e.target.value })
					}
				/>
				<input
					type='password'
					required
					placeholder='Password'
					onChange={(e) =>
						setInformation({ ...information, password: e.target.value })
					}
				/>
				<input
					type='password'
					required
					placeholder='Repassword'
					onChange={(e) =>
						setInformation({ ...information, repassword: e.target.value })
					}
				/>
			</div>
			<div style={{ margin: '5px 0' }}>
				<p style={{ display: 'none' }}></p>
				<div onClick={() => onSignup()}>
					<p>Sign up</p>
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
							<p>Or sign up with</p>
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
						<p onClick={() => setIsLogin(true)}>
							Already have an account? <span>Sign in</span>
						</p>
						<p>{err}</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default SignupForm;
