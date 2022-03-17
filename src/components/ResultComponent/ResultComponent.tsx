import React, { FC } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { clearState } from '../../app/quizSlice/getQuizSlice';

interface ResultProps {
  finalResult: {
    data: {
      id: number;
      question: string;
      correctAnswer: string;
      submittedAnswer: string;
    }[];
    score: number;
  };
}

const ResultComponent: FC<ResultProps> = ({ finalResult }) => {
  //destructure final result-------------------
  const { score, data } = finalResult;

  //dispatch
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1 className="text-center text-white">Result</h1>
      <h1 className="text-center text-white font-bold text-2xl">
        Your Score is: <span className="underline">{score}</span>
      </h1>
      <div className="mt-6">
        {data?.map(
          ({ id, question, correctAnswer, submittedAnswer }) => (
            <div key={id} className={`mb-5 border-b pb-2 `}>
              <h1 className="text-[#FFFFFF] text-2xl font-semibold">
                {question}
              </h1>
              <div className="flex justify-between items-center">
                <p className="text-gray-300 mt-1 font-medium text-lg">
                  Correct Answer is:
                  <span className="font-normal ml-3 text-white">
                    {correctAnswer}
                  </span>
                </p>
                <p className="text-gray-300 mt-1 font-medium text-lg">
                  Your Answer is:
                  <span
                    className={`font-normal ml-3 ${
                      correctAnswer !== submittedAnswer
                        ? 'text-[#ff7f50]'
                        : 'text-green-400'
                    }`}
                  >
                    {submittedAnswer}
                  </span>
                </p>
              </div>
            </div>
          )
        )}
      </div>
      <div
        onClick={() => dispatch(clearState())}
        className="text-center text-white bg-blue-800 py-2
         uppercase font-bold text-2xl cursor-pointer active:scale-95 duration-150"
      >
        Play Again
      </div>
    </div>
  );
};

export default ResultComponent;
