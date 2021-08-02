import React from 'react';
import Helpfulness from '../shared/Helpfulness.jsx';
import Report from '../shared/Report.jsx';
import StarRating from '../shared/StarRating.jsx';

const ReviewTile = (props) => {
  const { reviews } = props;
  const stars = [1, 1, 1, .8, 0];

  let key = 0;

  return reviews.length ? (
    <div id='review-tile'>
      <div className='tile'>
        {reviews.map((review) => (
          <div key={key++}>
            <div className='user-stamp'>
              <span className='star-rating'>{stars.map(star => (
                <a key={key++}>{String.fromCharCode((star > 0) ? 9733 : 9734)}</a>
              ))}</span>
              <span className='review-date'>{review.reviewer_name}, {new Date(review.date).toDateString()}</span>
            </div>
            <br></br><br></br>
            <div className='review'>
              <div className='review-summary'>{review.summary}</div>
              <br></br>
              <div className='review-body'>{review.body}</div>
              <br></br>
              {review.recommend ?
                <div className='review-recommend'>&#10003; I recommend this product!</div>
                : null
              }
              <div className='review-response'>{review.response}</div>
              <br></br>
              <Helpfulness review={review} />
              <span> | </span>
              <Report reviewId={review.review_id} />
              <hr></hr>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (<p>Loading...</p>);
};

export default ReviewTile;