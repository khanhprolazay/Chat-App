import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./slices/UserSlice";
import { FriendSlice } from "./slices/FriendSlice";
import { CurrentSlice } from './slices/CurrentSlice';
import { InvitationSlice } from "./slices/InvitationSlice";

const store = configureStore({
  reducer: {
    invitation: InvitationSlice.reducer,
    user: UserSlice.reducer,
    current: CurrentSlice.reducer,
    friends: FriendSlice.reducer
  },
  devTools: true
})

export default store;