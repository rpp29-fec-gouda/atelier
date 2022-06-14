import { IPhoto } from './IPhoto';

export interface IAnswerRead {

  "answer_id": number,

  /** Text of answer being given. */
  "body": string,
  /** Username for the answerer. */
  "answerer_name": string,
  /** Date answer was posted. */
  "date": string,
  /** Number of users who found this answer helpful. */
  "helpfulness": number,
  /** Urls corresponding to images to display. */
  "photos": [IPhoto]
}