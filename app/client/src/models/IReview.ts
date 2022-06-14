export interface IReview {
  /** Integer (1-5) indicating the review rating. */
  "rating": number,
  /** Summary text of the review. */
  "summary": string,
  /** Value indicating if the reviewer recommends the product. */
  "recommend": boolean,
  /** Continued or full text of the review. */
  "body": string
}