import { lazy, Suspense, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearState,
  getQuizData,
  getQuizResult,
  storeCheckedQuiz,
} from '../../app/quizSlice/getQuizSlice';
import QuizCart from '../QuizCart/QuizCart';
import { SelectedQuiz } from './types';

const ResultComponent = lazy(
  () => import('../ResultComponent/ResultComponent')
);

const QuizFeed = () => {
  //selector state---------------------------------------------- get state
  const {
    allQuizQuestion,
    finalResult,
    checkedQuizData: { submittedQuiz },
  } = useAppSelector(getQuizData);
  //--------------------------------------------------------create dispatch
  const dispatch = useAppDispatch();
  //selected quiz state for submit---------------------------------
  const [selectedQuiz, setSelectedQuiz] = useState<SelectedQuiz>({
    ansId: NaN,
    quiz: '',
    quizId: NaN,
  });

  //Submit handler------------------------------------------------ submit quiz handler
  const submitHandler = () => {
    dispatch(storeCheckedQuiz(selectedQuiz));
    setSelectedQuiz({
      ansId: NaN,
      quiz: '',
      quizId: NaN,
    });
  };

  //--------------------------------------------------------------if submitted quiz length is 5 then run this
  useEffect(() => {
    //if quiz length is 5 then dispatch to find answer
    if (submittedQuiz === 5) dispatch(getQuizResult());
    //clean selected Quiz state
    setSelectedQuiz({
      ansId: NaN,
      quiz: '',
      quizId: NaN,
    });
  }, [submittedQuiz, dispatch]);

  return (
    <div className="flex flex-col justify-between w-full min-h-[500px] relative">
      {/* quiz feed --------------------------------------------------------------------- */}
      {submittedQuiz !== 5 && (
        <>
          <div className="mt-20">
            {allQuizQuestion
              .slice(0 + submittedQuiz, 1 + submittedQuiz)
              .map((x) => (
                <QuizCart
                  setSelectedQuiz={setSelectedQuiz}
                  selectedQuiz={selectedQuiz}
                  key={x.id}
                  quizData={x}
                />
              ))}
          </div>
          <div className="mt-10 flex items-center space-x-4">
            {/* restart button */}
            {submittedQuiz >= 1 && submittedQuiz <= 4 && (
              <button
                onClick={() => dispatch(clearState())}
                className="text-white max-w-[100px] bg-[#4d5fe3] active:scale-95 duration-150 shadow-lg h-12 w-full rounded-full"
              >
                Restart
              </button>
            )}

            {/* submit button */}
            <button
              onClick={
                selectedQuiz?.ansId ? submitHandler : undefined
              }
              disabled={selectedQuiz?.ansId ? false : true}
              className={`${
                selectedQuiz?.ansId
                  ? 'bg-[#FEFEFF] active:scale-95 duration-150'
                  : 'bg-gray-200'
              } shadow-lg h-12 w-full rounded-full`}
            >
              Submit
            </button>
          </div>
        </>
      )}

      {/* quiz final result------------------------------------------------component */}
      {submittedQuiz === 5 && finalResult.data.length > 1 && (
        <Suspense fallback={<div>Loading...</div>}>
          <ResultComponent finalResult={finalResult} />
        </Suspense>
      )}
    </div>
  );
};

export default QuizFeed;
