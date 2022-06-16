"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interaction = void 0;
const api_1 = require("./api");
const endpoint = '/interactions';
exports.interaction = {
    postInteraction: (interaction) => api_1.requests.post(endpoint, interaction)
};
