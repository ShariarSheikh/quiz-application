//check quiz is chid interface of quiz interface------------
export interface CheckedQuiz {
  ansId: number;
  quizId: number;
  quiz: string;
}

interface FinalResult {
  score: number;
  data: {
    id: number;
    correctAnswer: string;
    question: string;
    submittedAnswer: string;
  }[];
}

//main state interface-------------------------------------
export interface QuizInterface {
  allQuizQuestion: QuizQuestionType[];
  checkedQuizData: {
    checkedQuiz: CheckedQuiz[];
    submittedQuiz: number;
  };
  finalResult: FinalResult;
}
