"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SearchQuestions = (props) => {
    const questions = props.questions;
    const callback = props.callback;
    let questionsFiltered = [];
    const handleOnchange = (e) => {
        const searchText = e.target.value;
        if (searchText.length >= 3) {
            questions.forEach(question => {
                const body = question.question_body;
                if (body.includes(searchText)) {
                    questionsFiltered.push(question);
                }
            });
            if (questionsFiltered.length !== 0) {
                callback(questionsFiltered);
                questionsFiltered = [];
            }
        }
        if (searchText.length < 3) {
            questionsFiltered = null;
            callback(questionsFiltered);
        }
    };
    return (<div>
      <input id='qa-search-question' className="qa-search-bar" type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS ..." name="search" onChange={handleOnchange}>
      </input>
    </div>);
};
exports.default = SearchQuestions;
