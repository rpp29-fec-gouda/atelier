"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Sort_jsx_1 = __importDefault(require("./Sort.jsx"));
const ReviewTile_jsx_1 = __importDefault(require("./ReviewTile.jsx"));
const NewReview_jsx_1 = __importDefault(require("./NewReview.jsx"));
const KeywordSearch_jsx_1 = __importDefault(require("./KeywordSearch.jsx"));
require("./reviewsList.css");
const ReviewsList = (props) => {
    const { characteristics, callback, averageRating, selectedProduct, loadMoreReviews, displayedReviews, reviewsLength, count, reviews, sortOptions, handleReviewSort, expanded, expandBody, getReviews, getRatings } = props;
    const handleMoreReviews = () => {
        loadMoreReviews();
    };
    return (<div id='rr-reviews-list'>
      <Sort_jsx_1.default reviews={displayedReviews} fullReviews={reviews} sortOptions={sortOptions} handleReviewSort={handleReviewSort}/>

      <KeywordSearch_jsx_1.default reviews={reviews} callback={callback}/>

      {reviews ?
            <div className='rr-displayed-reviews'>
          <ReviewTile_jsx_1.default reviews={displayedReviews} fullReviews={reviews} averageRating={averageRating} expanded={expanded} expandBody={expandBody}/>
        </div>
            : null}
      <div className='rr-review-buttons'>
        {count < reviewsLength ?
            <div className='rr-more-reviews button uppercase' onClick={handleMoreReviews}>MORE REVIEWS</div>
            : null}
        <NewReview_jsx_1.default reviews={reviews} selectedProduct={selectedProduct} characteristics={characteristics} getReviews={getReviews} getRatings={getRatings}/>
      </div>
    </div>);
};
exports.default = ReviewsList;
