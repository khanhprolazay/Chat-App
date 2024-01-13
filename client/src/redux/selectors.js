import { createSelector } from '@reduxjs/toolkit';

export const userSelector = (state) => state.user;
export const uidSelector = (state) => state.user.uid;
export const friendsSelector = (state) => state.friends;
export const currentSelector = (state) => state.current;
export const errorSelector = (state) => state.current.error;
export const invitationSelector = (state) => state.invitation;
export const usernameSelector = (state) => state.user.username;
export const currentTabSelector = (state) => state.current.tab;
export const conversationsSelector = (state) => state.conversations;
export const currentConversationSelector = (state) => state.current.cid;
export const numberInvitationSelector = (state) => state.invitation.length;
export const personalGroupSelector = (state) => state.current.personalOrGroup;

export const participantSelector = (cid) =>
	createSelector(friendsSelector, (friends) => {
		const index = friends.findIndex((friend) => friend.cid === cid);
		return index === -1 ? null : friends[index];
	});


export const isCheckedSelector = (cid) =>
	createSelector(friendsSelector, (friends) => {
		const index = friends.findIndex((friend) => friend.cid === cid);
		return index === -1 ? null : friends[index].is_checked;
	});
