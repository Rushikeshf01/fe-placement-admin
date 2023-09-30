"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/loginSlice";
import extraReducer from "./slice/extraSlice";
import facultyProfile from "./slice/facultySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    extra: extraReducer,
    faculty: facultyProfile,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
