interface SelectedQuizProps {
  ansId: number;
  quiz: string;
  quizId: number;
}

export interface QuizCartProps {
  quizData: QuizQuestionType;
  selectedQuiz: SelectedQuizProps;
  setSelectedQuiz: (x: SelectedQuizProps) => void;
}
