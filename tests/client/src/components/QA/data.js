export const questionsData = [
  {
    'question_id': 1,
    'question_body': 'question 1',
    'questions_helpfulness': 1,
    'reported': false,
    'answers': {
      1: { 'answerer_name': 'test1', 'body': 'answer1', 'helpfulness': 1 },
      2: { 'answerer_name': 'test2', 'body': 'answer2', 'helpfulness': 2 },
      3: { 'answerer_name': 'test3', 'body': 'answer3', 'helpfulness': 3 },
      4: { 'answerer_name': 'test4', 'body': 'answer4', 'helpfulness': 4 },
    },
  },
  {
    'question_id': 2,
    'question_body': 'question 2',
    'questions_helpfulness': 2,
    'reported': false,
    'answers': {},
  },
  {
    'question_id': 3,
    'question_body': 'question 3',
    'questions_helpfulness': 3,
    'reported': false,
    'answers': {},
  },
  {
    'question_id': 4,
    'question_body': 'question 4',
    'questions_helpfulness': 4,
    'reported': false,
    'answers': {},
  },
  {
    'question_id': 5,
    'question_body': 'question 5',
    'questions_helpfulness': 5,
    'reported': false,
    'answers': {},
  }
  
];

export const answersData = questionsData[0].answers;

