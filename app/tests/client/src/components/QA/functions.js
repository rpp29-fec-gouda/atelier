const cache = {questions: new Map()};

export const checkCache = (cacheName, productId) => {
  return cache[cacheName].get(productId);
};

export const updateCache = (cacheName, productId, data) => {
  cache[cacheName].set(productId, data);
};

