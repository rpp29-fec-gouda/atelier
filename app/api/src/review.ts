import { requests } from './api';
import {
  IReviewRead,
  IReviewWrite,
  IMetadataReview
} from '../models';

// Reviews API
// See: https://learn-2.galvanize.com/cohorts/2592/blocks/94/content_files/Front%20End%20Capstone/project-atelier/reviews.md
const endpoint = '/reviews';

type GetReviewsResponse = {
  data: {
    "product": string,
    "page": number,
    "count": number,
    "results": [IReviewRead]
  },
  status: any
};

type GetReviewMetadataResponse = {
  data: IMetadataReview
};

export const Review = {
  /**
   * Returns a list of reviews for a particular product. This list does not include any reported reviews.
   * @param productId ID of the product for which to retrieve reviews.
   * @param page Selects the page of results to return. Default 1.
   * @param count Specifies how many results per page to return. Default 5.
   * @param sort Changes the sort order of reviews to be based on "newest", "helpful", or "relevant".
   * @returns
   */
  getReviews: (productId: number, page: number = 1, count: number = 5, sort: string): Promise<GetReviewsResponse> =>
    requests.get(`${endpoint}?product_id=${productId}&page=${page}&count=${count}` + sort ? `&sort=${sort}` : ''),
  /**
   * Returns review metadata for a given product.
   * @param productId ID of the product for which data should be returned.
   * @returns
   */
  getReviewMetadata: (productId: number): Promise<GetReviewMetadataResponse> => requests.get(`${endpoint}/meta?product_id=${productId}`),
  /**
  * Adds a review for the given product.
  * @param review Review to add.
  * @returns
  */
  addReview: (review: IReviewWrite): Promise<void> => requests.post(`${endpoint}`, review), // POST: 201 created
  /**
  * Updates a review to show it was reported.
  * Note, this action does not delete the review, but the review will not be returned in the above GET request.
  * @param id ID of the review to update.
  * @returns
  */
  reportReview: (id: number): Promise<void> => requests.put(`${endpoint}/${id}/report`, {}), // PUT: 204 no content
  /**
  * Updates a review to show it was found helpful.
  * @param id Required ID of the review to update.
  * @returns
  */
  markReviewAsHelpful: (id: number): Promise<void> => requests.put(`${endpoint}/${id}/helpful`, {}),  // PUT: 204 no content
};