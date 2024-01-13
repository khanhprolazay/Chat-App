import { createSlice } from '@reduxjs/toolkit';

export const FriendSlice = createSlice({
	name: 'friends',
	initialState: [],
	reducers: {
		set: (state, action) => action.payload,
		add: (state, action) => {
			state.push(action.payload);
		},
		updateChecked: (state, action) => {
			const { cid, value } = action.payload;
			const index = state.findIndex((friend) => friend.cid === cid);
			state[index].is_checked = value;
		},
		delete: (state, action) => [],
	},
});
