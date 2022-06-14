"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./sort.css");
const Sort = (props) => {
    const { reviews, fullReviews, sortOptions, handleReviewSort } = props;
    return sortOptions ? (<div id='rr-sort'>
      <label for='rr-dropdown'></label>
      {fullReviews ? fullReviews.length : 0} reviews, sorted by <select className='rr-dropdown' onChange={handleReviewSort}>

        {sortOptions.map((option, i) => (<option className='rr-dropdown' type='submit' value={option} key={i}>{option}</option>))}
      </select>
    </div>) : (null);
};
exports.default = Sort;
