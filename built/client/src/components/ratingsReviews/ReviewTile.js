"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Helpfulness_jsx_1 = __importDefault(require("../shared/Helpfulness.jsx"));
const Report_jsx_1 = __importDefault(require("../shared/Report.jsx"));
const StarRating_jsx_1 = __importDefault(require("../shared/StarRating.jsx"));
const DisplayPhotos_jsx_1 = __importDefault(require("../shared/DisplayPhotos.jsx"));
require("./reviewTile.css");
const ReviewTile = (props) => {
    const { reviews, averageRating } = props;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    let key = 0;
    return reviews ? (<div className='rr-review-tile'>
      {reviews.map((review) => (<div className='rr-tile' key={key++}>
          <div className='rr-user-stamp'>
            <span className='rr-star-rating'>
              <StarRating_jsx_1.default rating={review.rating} max={5}/>
            </span>
            <span className='rr-review-date'>{review.reviewer_name}, {new Date(review.date).toLocaleDateString('en-EN', options)}</span>
          </div>
          <br></br>
          <div className='rr-review'>
            <div className='rr-review-summary'>{review.summary}</div>
            <br></br>
            <div className='rr-review-body'>{review.body}</div>
            <br></br>
            {review.photos.length > 0 ?
                <div id='rr-review-photos' className='rr-review-photos'>
                <DisplayPhotos_jsx_1.default photos={review.photos}/>
              </div> : null}
            {review.recommend ?
                <div className='rr-review-recommend'>&#10003; I recommend this product!</div>
                : null}
            {review.response ?
                <div>
                <br></br>
                <div className='rr-review-response'>
                  <div className='rr-review-response title'>Response from seller</div>
                  <div className='rr-review-response text'>{review.response}</div>
                </div>
              </div>
                : null}
            <br></br>
            <div className='rr-review-feedback'>
              <Helpfulness_jsx_1.default review={review}/>
              <span> | </span>
              <Report_jsx_1.default reviewId={review.review_id}/>
              <hr></hr>
            </div>
          </div>
        </div>))}
    </div>)
        : (null);
};
exports.default = ReviewTile;
