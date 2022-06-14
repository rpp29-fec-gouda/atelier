import { IReview } from './IReview';
import { IPhoto } from './IPhoto';

export interface IReviewRead extends IReview {
  "review_id": number,
  /** Response to the review. */
  "response": string | null,
  /** Date review was posted. */
  "date": string,
  /** Username of reviewer. */
  "reviewer_name": string,
  /** Number of users who found this review helpful. */
  "helpfulness": number,
  /** Urls that link to images to be shown. */
  "photos": [IPhoto]
}