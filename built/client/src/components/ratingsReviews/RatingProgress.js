"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./ratingProgress.css");
const RatingProgress = (props) => {
    const { completed, ratings, handleRatingProgressFilter } = props;
    return completed ? (<div className='rr-rating-progress'>
      {isNaN(completed.percentage) ? '' :
            <div className='rr-rating-progress-bar' onClick={handleRatingProgressFilter} value={completed.star} id={completed.star}>
          <label for='rr-progress-bar rr-label' onClick={handleRatingProgressFilter} id={completed.star}>{completed.star} stars </label>
          <meter className='rr-progress-bar rr-meter' onClick={handleRatingProgressFilter} id={completed.star} value={completed.percentage} min='0' max='100'>{completed.percentage}</meter>
          <label for='rr-progress-bar rr-label' onClick={handleRatingProgressFilter} id={completed.star}>({completed.count}) </label>
        </div>}
    </div>) : null;
};
exports.default = RatingProgress;
