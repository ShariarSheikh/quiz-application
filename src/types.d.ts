interface QuizQuestionType {
  id: number;
  question: string;
  answers: {
    id: number;
    answer: string;
  }[];
}

interface QuizDataType {
  id: number;
  question: string;
  correctAnswer: string;
  answers: {
    id: number;
    answer: string;
  }[];
}
