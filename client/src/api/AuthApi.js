import AxiosClient from 'api/AxiosClient';

class AuthApi {
	getNewAccessToken = async (refreshToken) => {
		return await AxiosClient.get('/auth/token/get_new_access_token', {
			refreshToken: refreshToken,
		});
	};

	signUp = async (username, password, repassword) => {
		return await AxiosClient.post('/auth/signup', {
			username: username,
			password: password,
			repassword: repassword,
		});
	};

	login = async (username, password) => {
		return await AxiosClient.post('/auth/login', {
			username: username,
			password: password,
		});
	};

	logout = async (uid) => {
		return await AxiosClient.post('/auth/logout', { uid: uid });
	};
}

export default new AuthApi();
