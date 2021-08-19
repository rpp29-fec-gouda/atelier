import React from 'react';
import Helpfulness from '../shared/Helpfulness.jsx';
import Report from '../shared/Report.jsx';
import StarRating from '../shared/StarRating.jsx';
import DisplayPhotos from '../shared/DisplayPhotos.jsx';
import './reviewTile.css';

const ReviewTile = (props) => {
  const { reviews, averageRating } = props;
  if (reviews) {

    reviews.map((review) => (
      console.log('reviews', review.body.slice(0, 20))
    ));
  }
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  let key = 0;

  return reviews ? (
    <div id='rr-review-tile'>
      {reviews.map((review) => (
        <div id='rr-tile' className='rr-tile' key={key++}>
          <div id='rr-user-stamp' className='rr-user-stamp'>
            <span id='rr-star-rating' className='rr-star-rating'>
              <StarRating rating={averageRating} max={5} />
            </span>
            <span id='rr-review-date' className='rr-review-date'>{review.reviewer_name}, {new Date(review.date).toLocaleDateString('en-EN', options)}</span>
          </div>
          <br></br>
          <div id='rr-review' className='rr-review'>
            <div id='rr-review-summary' className='rr-review-summary'>{review.summary}</div>
            <br></br>
            {review.body.length < 250 ?
              <div id='rr-review-body' className='rr-review-body'>{review.body}</div>
              :
              <div id='rr-full-review-body'>
                <div id='rr-review-body' className='rr-review-body'>{review.body.slice(0, 250)}</div>
              </div>
            }
            <br></br>

            {review.photos.length > 0 ?
              <div id='rr-review-photos' className='rr-review-photos'>
                <DisplayPhotos photos={review.photos} />
              </div> : null}
            {review.recommend ?
              <div id='rr-review-recommend' className='rr-review-recommend'>&#10003; I recommend this product!</div>
              : null
            }
            {review.response ?
              <div>
                <br></br>
                <div id='rr-review-response' className='rr-review-response'>
                  <div id='rr-review-response title' className='rr-review-response title'>Response from seller</div>
                  <div id='rr-review-response text' className='rr-review-response text'>{review.response}</div>
                </div>
              </div>
              : null
            }
            <br></br>
            <div id='rr-review-feedback' className='rr-review-feedback'>
              <Helpfulness review={review} />
              <span> | </span>
              <Report reviewId={review.review_id} />
              <hr></hr>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
    : (null);
};

export default ReviewTile;