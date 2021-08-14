import React from 'react';
import Helpfulness from '../shared/Helpfulness.jsx';
import Report from '../shared/Report.jsx';
import StarRating from '../shared/StarRating.jsx';
import './reviewTile.css';

const ReviewTile = (props) => {
  const { reviews } = props;
  const stars = [1, 1, 1, .8, 0];
  let key = 0;

  return reviews ? (
    <div id='review-tile'>
      {reviews.map((review) => (
        <div className='tile' key={key++}>
          <div className='user-stamp'>
            <span className='star-rating'>{stars.map(star => (
              <a key={key++}>{String.fromCharCode((star > 0) ? 9733 : 9734)}</a>
            ))}</span>
            <span className='review-date'>{review.reviewer_name}, {new Date(review.date).toDateString().slice(3)}</span>
          </div>
          <br></br>
          <div className='review'>
            <div className='review-summary'>{review.summary}</div>
            <br></br>
            <div className='review-body'>{review.body}</div>
            <br></br>
            {review.photos.length > 0 ?
              <div className='review-photos'>
                {review.photos.map((photo) => (
                  <div class='photos' key={photo.id}>
                    <img src={photo.url} />
                  </div>
                ))}
              </div> : null}
            {review.recommend ?
              <div className='review-recommend'>&#10003; I recommend this product!</div>
              : null
            }
            {review.response ?
              <div className='review-response'>Response from seller: {review.response}</div>
              : null
            }
            <div className='review-response'>{review.response}</div>
            <br></br>
            <div className='review-feedback'>
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