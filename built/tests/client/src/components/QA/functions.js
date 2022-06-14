"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCache = exports.checkCache = void 0;
const cache = { questions: new Map() };
const checkCache = (cacheName, productId) => {
    return cache[cacheName].get(productId);
};
exports.checkCache = checkCache;
const updateCache = (cacheName, productId, data) => {
    cache[cacheName].set(productId, data);
};
exports.updateCache = updateCache;
