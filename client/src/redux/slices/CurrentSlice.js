import { createSlice } from '@reduxjs/toolkit';

// tab: 0: Message, 1: , 2: Create group, 3: Add friend, 4: Notification, 5: Setting, 6: Edit profile, 7:open AddParticipantPopup
// conversation: current conversation
// personalOrGrou: Recent message nav: allow user to display only personal or group conversation
// participant: open AddParticipantPopup
// error: open SomethingWentWrong

const init = { tab: 0, cid: null, personalOrGroup: 'personal', error: false };

export const CurrentSlice = createSlice({
	name: 'current',
	initialState: init,
	reducers: {
		setTab: (state, action) => {
			state.tab = action.payload;
		},
		setPersonalOrGroup: (state, action) => {
			state.personalOrGroup = action.payload;
		},
		setConversation: (state, action) => {
			state.cid = action.payload;
		},
		reset: (state, action) => {
			state.tab = 0;
			state.cid = '';
			state.personalOrGroup = 'personal';
		},
		setError: (state, action) => {
			state.error = action.payload;
		}
	},
});
