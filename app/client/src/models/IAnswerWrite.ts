export interface IAnswerWrite {
  /** Text of answer being given. */
  "body": string,
  /** Username for answer giver. */
  "name": string,
  /** Email address for question answerer. */
  "email": string,
  /** Urls corresponding to images to display. */
  "photos": [string]
}