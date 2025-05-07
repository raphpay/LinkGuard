import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUser from "../../models/IUser";

export interface UserState {
  currentUser: IUser | undefined;
}

const initialState: UserState = {
  currentUser: undefined,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
    },
    removeCurrentUser: (state) => {
      state.currentUser = undefined;
    },
  },
});

export const { setCurrentUser, removeCurrentUser } = userSlice.actions;

export default userSlice.reducer;
