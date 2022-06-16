"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviews = void 0;
const api_1 = require("./api");
const endpoint = '/reviews';
exports.reviews = {
    getReviews: (productId, page = 1, count = 5, sort) => api_1.requests.get(`${endpoint}?product_id=${productId}&page=${page}&count=${count}` + sort ? `&sort=${sort}` : ''),
    getReviewMetadata: (productId) => api_1.requests.get(`${endpoint}/meta?product_id=${productId}`),
    addReview: (review) => api_1.requests.post(`${endpoint}`, review),
    reportReview: (id) => api_1.requests.put(`${endpoint}/${id}/report`, {}),
    markReviewAsHelpful: (id) => api_1.requests.put(`${endpoint}/${id}/helpful`, {}),
};
