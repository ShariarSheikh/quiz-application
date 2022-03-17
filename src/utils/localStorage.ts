export const checkedQuiz = localStorage.getItem('checkedQuiz')
  ? JSON.parse(localStorage.getItem('checkedQuiz') || '')
  : [];

export const submittedQuiz: number = localStorage.getItem(
  'submittedQuiz'
)
  ? JSON.parse(localStorage.getItem('submittedQuiz') || '')
  : 0;

export const resultData = localStorage.getItem('finalResultData')
  ? JSON.parse(localStorage.getItem('finalResultData') || '')
  : [];

export const resultScore: number = localStorage.getItem(
  'finalResultScore'
)
  ? JSON.parse(localStorage.getItem('finalResultScore') || '')
  : 0;
