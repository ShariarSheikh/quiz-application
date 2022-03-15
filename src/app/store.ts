import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});

//infer the `RootSate` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState,users: UserState}
export type AppDispatch = typeof store.dispatch;
