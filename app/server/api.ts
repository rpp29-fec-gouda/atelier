import axios, { AxiosResponse } from 'axios';
import config = require('../config');

const instance = axios.create({
  baseURL: config.API,
  headers: {
    Authorization: config.GITHUB_TOKEN
  }
});
// axios.defaults.baseURL = config.API;
// axios.defaults.headers.common['Authorization'] = config.GITHUB_TOKEN;

const responseBody = (response: AxiosResponse) => response.data;

export const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
  put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

// // Status: 204 NO CONTENT
// /**
//  * Updates an answer to show it was found helpful.
//  * @param id ID of the answer to update.
//  * @returns
//  */
//  async function markAnswerAsHelpful(id: string) {
//   try {
//     const { data, status } = await instance.get<GetReviewMetadataResponse>(`${answersEndpoint}/${id}/helpful`);

//     console.log('Response status is: ', status);

//     return data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log('error message: ', error.message);
//       return error.message;
//     } else {
//       console.log('unexpected error: ', error);
//       return error;
//     }
//   }
// }