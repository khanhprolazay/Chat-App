import { createSlice } from '@reduxjs/toolkit';

export const InvitationSlice = createSlice({
	name: 'invitation',
	initialState: [],
	reducers: {
		set: (state, action) => action.payload,
		add: (state, action) => {
			state.push(action.payload);
		},
		remove: (state, action) => {
			const index = state.findIndex(
				(inv) => inv.sender_id === action.payload.sender_id
			);
			state.splice(index, 1);
		},
		delete: (state, action) => [],
	},
});
