import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const getUserFromCookies = () => {
	const userData = Cookies.get('user');
	if (userData) return JSON.parse(userData);
	else return {};
};

export const UserSlice = createSlice({
	name: 'user',
	initialState: getUserFromCookies(),
	reducers: {
		set: (state, action) => {
			const { user, accessToken, refreshToken } = action.payload;
			state.uid = user.uid;
			state.phone = user.phone;
			state.image = user.image;
			state.username = user.username;
			state.display_name = user.display_name;

			Cookies.set('user', JSON.stringify(user));
			Cookies.set('uid', JSON.stringify(user.uid));
			Cookies.set('access_token', accessToken);
			Cookies.set('refresh_token', refreshToken);
		},
		update: (state, action) => {},
		delete: (state, action) => {
			delete state.uid;
			delete state.username;
			delete state.display_name;
			delete state.avatar_image;
			delete state.phone;

			Cookies.remove('user');
			Cookies.remove('uid');
			Cookies.remove('access_token');
			Cookies.remove('refresh_token');
		},
	},
});
