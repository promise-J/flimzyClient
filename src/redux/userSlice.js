import { createSlice } from "@reduxjs/toolkit";

const logged = localStorage.getItem("secretToken");

const initialState = {
  user: null,
  isLogged: Boolean(logged),
  isLoading: false,
  chatId: null,
  userList: [],
  userRequest: [],
  userFriends: [],
  notifications: [],
  isConnected: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogged = true;
      state.user = action.payload;
    },
    loginStart: (state) => {
      state.isLogged = false;
      state.isLoading = true;
    },
    loginFailure: (state) => {
      state.isLogged = false;
      state.isLoading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLogged = false;
      state.chatId = null;
    },
    setUsers: (state, action) => {
      state.userList = action.payload;
    },
    setUserRequest: (state, action) => {
      state.userRequest = action.payload;
    },
    addUserRequest: (state, action) => {
      if (
        !state.userRequest.map((usr) => usr._id).includes(action.payload._id)
      ) {
        state.userRequest.push(action.payload);
      } else {
        return;
      }
    },
    initNotification: (state, action) => {
      state.notifications = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications = state.notifications.push(action.payload);
    },
    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    setUserFriends: (state, action) => {
      state.userFriends = action.payload;
    },
  },
});

export const {
  login,
  setUser,
  addUserRequest,
  setChatId,
  logout,
  setUsers,
  setIsConnected,
  setUserRequest,
  addNotification,
  initNotification,
  setUserFriends
} = userSlice.actions;

export default userSlice.reducer;
