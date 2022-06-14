"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const RatingProgress_jsx_1 = __importDefault(require("./RatingProgress.jsx"));
const StarRating_jsx_1 = __importDefault(require("../shared/StarRating.jsx"));
require("./ratingBreakdown.css");
const RatingBreakdown = (props) => {
    const { ratings, recommended, handleRatingProgressFilter, ratingDetails } = props;
    let key = 0;
    if (ratings) {
        const ratingsArr = Object.entries(ratings);
        let valueRatings = 0;
        let totalRatings = 0;
        ratingsArr.forEach(rating => {
            let ratingNumber = parseInt(rating[1]);
            totalRatings += ratingNumber;
            valueRatings += parseInt(rating[0]) * parseInt(rating[1]);
        });
        console.log('Total Number of Ratings: ', totalRatings);
        console.log('Total Value of Ratings: ', valueRatings);
        const oneBar = parseInt(ratings[1]) || 0;
        const twoBar = parseInt(ratings[2]) || 0;
        const threeBar = parseInt(ratings[3]) || 0;
        const fourBar = parseInt(ratings[4]) || 0;
        const fiveBar = parseInt(ratings[5]) || 0;
        let averageRating = valueRatings / totalRatings;
        let roundedAverage = Math.round(averageRating * 10) / 10;
        const barFills = [
            { star: '5', count: fiveBar, percentage: fiveBar / totalRatings * 100 },
            { star: '4', count: fourBar, percentage: fourBar / totalRatings * 100 },
            { star: '3', count: threeBar, percentage: threeBar / totalRatings * 100 },
            { star: '2', count: twoBar, percentage: twoBar / totalRatings * 100 },
            { star: '1', count: oneBar, percentage: oneBar / totalRatings * 100 },
        ];
        console.log('BarFills', barFills);
        let averageRecommend = 0;
        if (!recommended.false) {
            averageRecommend = 100;
        }
        else {
            averageRecommend = Math.round(parseInt(recommended.true) / (parseInt(recommended.false) + parseInt(recommended.true)) * 100);
        }
        ratingDetails(averageRating, totalRatings, roundedAverage);
        return averageRating ? (<div className='rr-rating-breakdown'>
        <div className='rr-overall-rating'>
          <span id='rr-rating-breakdown rr-average-rating' className='rr-rating-breakdown rr-average-rating'>{isNaN(roundedAverage) ? '' : roundedAverage}</span>
          <div className='rr-rating-breakdown rr-star-rating'>
            <StarRating_jsx_1.default rating={averageRating} max={5}/>
          </div>
        </div>
        <br></br><br></br>
        <div className='rr-rating-review-percentage'>{averageRecommend}% of reviews recommend this product</div>
        <br></br>
        <h2>Rating Breakdown</h2>
        {barFills.map((item, i) => (<RatingProgress_jsx_1.default key={i} ratings={ratings} completed={item} handleRatingProgressFilter={handleRatingProgressFilter}/>))}
      </div>) : (<div id='rr-rating-breakdown'>Loading...</div>);
    }
    else {
        return (<div className='rr-rating-breakdown'></div>);
    }
};
exports.default = RatingBreakdown;
