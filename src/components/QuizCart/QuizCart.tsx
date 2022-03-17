import { FC } from 'react';
import { QuizCartProps } from './types';

const QuizCart: FC<QuizCartProps> = ({
  quizData,
  selectedQuiz,
  setSelectedQuiz,
}) => {
  const { id: quizId, answers, question } = quizData;

  //quiz click handler
  const handleChange = ({
    id,
    answer,
  }: {
    id: number;
    answer: string;
  }) => {
    setSelectedQuiz({ ansId: id, quiz: answer, quizId: quizId });
  };

  return (
    <div className="w-full">
      <h1 className="text-[#FFFFFF] text-3xl font-semibold">
        {question}
      </h1>

      <div className="mt-6">
        {/* NOTE: this is quiz question array--------------------------- */}
        {answers.slice(0, 4).map(({ id, answer }) => (
          <div
            key={id}
            onClick={() => handleChange({ id, answer })}
            className="cursor-pointer flex items-center space-x-4 py-3 px-3 bg-[#4d5fe3] mb-5"
          >
            <div
              className={`h-4 w-4 rounded-full overflow-hidden ${
                selectedQuiz?.ansId === id
                  ? 'bg-green-300'
                  : 'bg-white'
              }`}
            />
            <p className="text-[white] font-medium">{answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizCart;
