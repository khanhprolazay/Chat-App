import axios from 'axios';
import {
	getAccessToken,
	getRefreshToken,
	isTokenExpried,
	getNewAccessToken,
	configHeaderWithToken,
} from '../utils';
import Cookies from 'js-cookie';

const AxiosClient = axios.create({
	// baseURL: 'http://52.139.169.232:5000/api',
	baseURL: 'http://localhost:5000/api',
	headers: {
		'content-type': 'application/json',
	},
});

// Hanlde refresh token and access token ...
let refreshTokenRequest = null;
AxiosClient.interceptors.request.use(
	async (config) => {
		const access_token = getAccessToken();
		const refresh_token = getRefreshToken();

		// If user does not log in, return default config
		if (!access_token) return config;

		// If user logged in and access token isn't expried, attach access token
		if (!isTokenExpried(access_token))
			return configHeaderWithToken(config, access_token);

		// If user logged in and access token expried, get new token and attach it
		refreshTokenRequest = refreshTokenRequest
			? refreshTokenRequest
			: getNewAccessToken(refresh_token);

		const new_token = await refreshTokenRequest;
		refreshTokenRequest = null;
		Cookies.set('access_token', new_token);
		return configHeaderWithToken(config, new_token);
	},
	(err) => {
		console.log(err)
		return Promise.reject(err);
	}
);

AxiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}
	},
	(err) => {
		if (err.response) throw err.response;
		else throw {...err, data: 'REQUEST TIME OUT'};
	}
);

export default AxiosClient;
