import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import quizData from '../../data/quizData';
import {
  checkedQuiz,
  resultData,
  resultScore,
  submittedQuiz,
} from '../../utils/localStorage';
import { RootState } from '../store';
import { CheckedQuiz, QuizInterface } from './types';

//state----------------------------------------
const initialState: QuizInterface = {
  allQuizQuestion: [],
  checkedQuizData: {
    checkedQuiz: checkedQuiz,
    submittedQuiz: submittedQuiz,
  },
  finalResult: {
    score: resultScore,
    data: resultData,
  },
};

const getQuizSlice = createSlice({
  name: 'quiz',
  initialState,

  reducers: {
    //get quiz question------------------------------------
    storeQuizQuestions: (
      state,
      action: PayloadAction<QuizQuestionType[]>
    ) => {
      const removeAns = action.payload.map((x) => {
        return {
          id: x.id,
          question: x.question,
          answers: x.answers,
        };
      });

      state.allQuizQuestion = removeAns;
    },

    //get quiz full data------------------------------------
    storeCheckedQuiz: (state, action: PayloadAction<CheckedQuiz>) => {
      state.checkedQuizData.checkedQuiz.push(action.payload);
      if (state.checkedQuizData.submittedQuiz < 5)
        state.checkedQuizData.submittedQuiz =
          state.checkedQuizData.submittedQuiz + 1;

      //store in local storage------------------
      localStorage.setItem(
        'checkedQuiz',
        JSON.stringify(state.checkedQuizData.checkedQuiz)
      );
      localStorage.setItem(
        'submittedQuiz',
        JSON.stringify(state.checkedQuizData.submittedQuiz)
      );
    },
    //get quiz result data------------------------------------
    getQuizResult: (state) => {
      let collectScore: number = 0;
      const resultData = quizData.map((quiz) => {
        //collect score
        const isAnsCorrect =
          quiz.correctAnswer !==
          state.checkedQuizData.checkedQuiz[quiz.id - 1]?.quiz;

        if (!isAnsCorrect) collectScore = collectScore + 5;

        // return new array
        return {
          id: quiz.id,
          question: quiz.question,
          correctAnswer: quiz.correctAnswer,
          submittedAnswer:
            state.checkedQuizData.checkedQuiz[quiz.id - 1]?.quiz,
        };
      });

      //update state
      state.finalResult.data = resultData;
      state.finalResult.score = collectScore;

      //store in local storage-------------------------
      localStorage.setItem(
        'finalResultData',
        JSON.stringify(state.finalResult.data)
      );
      localStorage.setItem(
        'finalResultScore',
        JSON.stringify(state.finalResult.score)
      );
    },
    clearState: (state) => {
      //remove state
      state.checkedQuizData.checkedQuiz = [];
      state.checkedQuizData.submittedQuiz = 0;
      state.finalResult.score = 0;
      state.finalResult.data = [];

      //remove local storage state
      localStorage.removeItem('checkedQuiz');
      localStorage.removeItem('submittedQuiz');
      localStorage.removeItem('finalResultData');
      localStorage.removeItem('finalResultScore');
    },
  },
});

//action export -------------------------------------------
export const {
  storeQuizQuestions,
  storeCheckedQuiz,
  getQuizResult,
  clearState,
} = getQuizSlice.actions;

//state export----------------------------------------------
export const getQuizData = (state: RootState) => state.getQuizData;

export default getQuizSlice.reducer;
