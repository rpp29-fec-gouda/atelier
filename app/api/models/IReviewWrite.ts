import { IReview } from './IReview';

export interface IReviewWrite extends IReview {
  /** ID of the product to post the review for. */
  "product_id": number,
  /** Username for question asker. */
  "name": string,
  /** Email address for question asker. */
  "email": string,
  /** Urls that link to images to be shown. */
  "photos": [string],
  /** Object of keys representing characteristic_id and values representing the review value for that characteristic. */
  "characteristics": Map<number, number>
}