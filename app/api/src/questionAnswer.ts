import { requests } from './api';
import {
  IQuestionRead,
  IQuestionWrite,
  IAnswerRead,
  IAnswerWrite
} from '../models';

// Questions & Answers API
// Notes: https://learn-2.galvanize.com/cohorts/2592/blocks/94/content_files/Front%20End%20Capstone/project-atelier/qa.md
const questionsEndpoint = '/qa/questions';

type GetQuestionsResponse = {
  data: {
    "product_id": number,
    "results": [IQuestionRead]
  }
};


export const Question = {
  /**
  * Returns a list of reviews for a particular product. This list does not include any reported reviews.
  * @param productId ID of the product for which to retrieve reviews.
  * @param page Selects the page of results to return. Default 1.
  * @param count Specifies how many results per page to return. Default 5.
  */
  getQuestions: (productId: number, page: number = 1, count: number = 5): Promise<GetQuestionsResponse> =>
    requests.get(`${questionsEndpoint}?product_id=${productId}&page=${page}&count=${count}`),
  /**
  * Adds a question for the given product.
  * @param question Question to add.
  * @returns
  */
  addQuestion: (question: IQuestionWrite): Promise<void> => requests.post(`${questionsEndpoint}`, question), // Status: 201 CREATED
  /**
  * Updates a question to show it was reported.
  * Note, this action does not delete the question, but the question will not be returned in the above GET request.
  * @param id ID of the question to update.
  */
  reportQuestion: (id: string): Promise<void> => requests.put(`${questionsEndpoint}/${id}/report`, {}), // Status: 204 NO CONTENT
  /**
  * Updates a question to show it was found helpful.
  * @param id ID of the question to update.
  * @returns
  */
  markQuestionAsHelpful: (id: string): Promise<void> => requests.put(`${questionsEndpoint}/${id}/helpful`, {})  // Status: 204 NO CONTENT
};

const answersEndpoint = '/qa/answers';

type GetAnswersResponse = {
  data: {
    "question": number,
    "page": number,
    "count": number,
    "results": [IAnswerRead]
  }
};

export const Answer = {
  /**
  * Returns a list of reviews for a particular product. This list does not include any reported reviews.
  * @param questionId ID of the question for which answers are needed.
  * @param page Selects the page of results to return. Default 1.
  * @param count Specifies how many results per page to return. Default 5.
  */
  getAnswers: (questionId: number, page: number = 1, count: number = 5): Promise<GetAnswersResponse> =>
    requests.get(`${questionsEndpoint}/${questionId}/answers?page=${page}&count=${count}`),
  /**
  * Adds an answer for the given question.
  * @param questionId ID of the question to post the answer for.
  * @param answer Answer to add.
  */
  addAnswer: (questionId: number, answer: IAnswerWrite): Promise<void> =>
    requests.post(`${questionsEndpoint}/${questionId}/answers`, answer), // Status: 201 CREATED
  /**
  * Updates an answer to show it has been reported.
  * Note, this action does not delete the answer, but the answer will not be returned in the above GET request.
  * @param id ID of the answer to update.
  */
  reportAnswer: (id: string): Promise<void> => requests.put(`${answersEndpoint}/${id}/report`, {}), // Status: 204 NO CONTENT
  /**
  * Updates an answer to show it was found helpful.
  * @param id ID of the answer to update.
  * @returns
  */
  markAnswerAsHelpful: (id: string): Promise<void> => requests.put(`${answersEndpoint}/${id}/helpful`, {}) // Status: 204 NO CONTENT
};