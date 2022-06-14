export interface IQuestionWrite {
  /** Text of question being asked. */
  "body": string,
  /** Username for question asker. */
  "name": string,
  /** Email address for question asker. */
  "email": string,
  /** ID of the Product for which the question is posted. */
  "product_id": number
}