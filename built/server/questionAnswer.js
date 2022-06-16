"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Answer = exports.Question = void 0;
const api_1 = require("./api");
const questionsEndpoint = '/qa/questions';
exports.Question = {
    getQuestions: (productId, page = 1, count = 5) => api_1.requests.get(`${questionsEndpoint}?product_id=${productId}&page=${page}&count=${count}`),
    addQuestion: (question) => api_1.requests.post(`${questionsEndpoint}`, question),
    reportQuestion: (id) => api_1.requests.put(`${questionsEndpoint}/${id}/report`, {}),
    markQuestionAsHelpful: (id) => api_1.requests.put(`${questionsEndpoint}/${id}/helpful`, {})
};
const answersEndpoint = '/qa/answers';
exports.Answer = {
    getAnswers: (questionId, page = 1, count = 5) => api_1.requests.get(`${questionsEndpoint}/${questionId}/answers?page=${page}&count=${count}`),
    addAnswer: (questionId, answer) => api_1.requests.post(`${questionsEndpoint}/${questionId}/answers`, answer),
    reportAnswer: (id) => api_1.requests.put(`${answersEndpoint}/${id}/report`, {}),
    markAnswerAsHelpful: (id) => api_1.requests.put(`${answersEndpoint}/${id}/helpful`, {})
};
