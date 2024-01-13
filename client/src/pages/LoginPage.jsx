import 'css/LoginPage.css';
import LoginForm from 'components/LoginForm';
import SignupForm from 'components/SignupForm';
import { useState } from 'react';

function LoginPage() {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<div className='loginpage-container'>
			{isLogin ? (
				<LoginForm setIsLogin={setIsLogin} />
			) : (
				<SignupForm setIsLogin={setIsLogin} />
			)}
		</div>
	);
}

export default LoginPage;
