"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const RatingBreakdown_jsx_1 = __importDefault(require("./RatingBreakdown.jsx"));
const ProductBreakdown_jsx_1 = __importDefault(require("./ProductBreakdown.jsx"));
require("./ratingList.css");
const RatingList = (props) => {
    const { reviews, ratings, characteristics, recommended, handleRatingProgressFilter, ratingDetails, updateAverage } = props;
    return (<div className='rr-rating-list'>
      <RatingBreakdown_jsx_1.default ratings={ratings} ratingDetails={ratingDetails} totalRating={props.totalRating} reviews={reviews} recommended={recommended} handleRatingProgressFilter={handleRatingProgressFilter}/>
      <br></br>
      <ProductBreakdown_jsx_1.default characteristics={characteristics}/>
    </div>);
};
exports.default = RatingList;
