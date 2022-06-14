"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cart = void 0;
const api_1 = require("./api");
const endpoint = '/cart';
exports.cart = {
    getCart: () => api_1.requests.get(endpoint),
    addToCart: (sku) => api_1.requests.post(endpoint, { "sku_id": sku })
};
