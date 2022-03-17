import { configureStore } from '@reduxjs/toolkit';
import getQuizSlice, {
  storeQuizQuestions,
} from './quizSlice/getQuizSlice';
import quizData from '../data/quizData';

export const store = configureStore({
  reducer: {
    //quiz state
    getQuizData: getQuizSlice,
  },
});

//when page load || get all quiz in state---------------------------------NOTE:
store.dispatch(storeQuizQuestions(quizData));

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
//infer the `RootSate` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState,users: UserState}
export type AppDispatch = typeof store.dispatch;
