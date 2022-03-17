import React, { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { getQuizData } from '../../app/quizSlice/getQuizSlice';

const ProgressBar: FC = () => {
  const { checkedQuizData } = useAppSelector(getQuizData);

  //destructure ----------------------------
  const { submittedQuiz } = checkedQuizData;

  //calculate quiz number and progress bar width-------------------------
  const percent = 20 * submittedQuiz;
  const quizNumber = 0 + submittedQuiz;

  return (
    <div className="mt-10 transition-all duration-200 ease-out px-3">
      <div className="relative h-2 w-full bg-[#4D5FE3] rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-r-full"
          style={{ width: `${percent}%` }}
        />
      </div>
      <h1 className="mt-3 text-white">{quizNumber}/5</h1>
    </div>
  );
};

export default ProgressBar;
