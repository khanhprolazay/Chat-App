import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";

export const randomColor = () =>
	Math.floor(Math.random() * 16777215).toString(16);

export const getAccessToken = () => {
	return Cookies.get("access_token");
};

export const getRefreshToken = () => {
	return Cookies.get("refresh_token");
};

export const isTokenExpried = (token) => {
	return jwtDecode(token).exp < Date.now() / 1000;
};

export const configHeaderWithToken = (config, access_token) => {
	return {
		...config,
		headers: {
			...config.headers,
			authorization: "Bear " + access_token,
		},
	};
};

export async function getNewAccessToken(refreshToken) {
	const body = { refresh_token: refreshToken };
	const response = await axios.post(
		// 'http://52.139.169.232:5000/api/auth/token/get_new_access_token',
		"http://localhost:5000/api/auth/token/get_new_access_token",
		body
	);
	return response.data;
}
