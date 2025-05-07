// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./slices/tokenReducer";
import userReducer from "./slices/userReducer";

// Create Redux store with persisted reducer
const store = configureStore({
  reducer: {
    tokens: tokenReducer,
    users: userReducer,
  },
});

export default store;
