import { IAnswerRead } from './IAnswerRead';

export interface IQuestionRead {
  "question_id": number,
  /** Text of question being asked. */
  "question_body": string,
  /** Date question was posted. */
  "question_date": string,
  /** Username for question asker. */
  "asker_name": string,
  /** Number of users who found this review helpful. */
  "question_helpfulness": number,
  /**  */
  "reported": boolean,
  /** Object of keys representing answer_id and values representing the answer data for the question. */
  "answers": Map<number, IAnswerRead> // Note: answer_id is replaced with id here?
}