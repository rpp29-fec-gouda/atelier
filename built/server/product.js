"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const api_1 = require("./api");
const endpoint = '/products';
exports.products = {
    getProducts: (page = 1, count = 5) => api_1.requests.get(`${endpoint}?page=${page}&count=${count}`),
    getProduct: (id) => api_1.requests.get(`${endpoint}?product_id=${id}`),
    getProductStyles: (id) => api_1.requests.get(`${endpoint}/${id}/styles`),
    getRelatedProducts: (id) => api_1.requests.get(`${endpoint}/${id}/related`)
};
