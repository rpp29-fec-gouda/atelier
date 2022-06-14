"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const ClickedTracker = (e) => {
    if (e.target.id) {
        const body = {
            element: e.target.id,
            widget: 'QA',
            time: new Date()
        };
        axios_1.default.post('/interactions', body)
            .then(res => {
            console.log(res);
        })
            .catch(err => console.log(err));
    }
};
exports.default = ClickedTracker;
