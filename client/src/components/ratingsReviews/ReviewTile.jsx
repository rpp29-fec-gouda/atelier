import React from 'react';
import Helpfulness from '../shared/Helpfulness.jsx';
import Report from '../shared/Report.jsx';

const ReviewTile = (props) => {
  const { reviews } = props;
  let key = 0;

  return reviews.length ? (
    <div id='reviewTile'>
      <div className='Tile'>
        {reviews.map((review) => (
          <div key={key++}>
            <div className='userStamp'>
              <span className='ReviewRating'>{review.rating} stars</span>
              {/* <span className='ReviewerName'>{review.reviewer_name}</span> */}
              <span className='ReviewDate'>{review.reviewer_name}, {new Date(review.date).toDateString()}</span>
            </div>
            <br></br><br></br>
            <div className='Review'>
              <div className='ReviewSummary'>{review.summary}</div>
              <br></br>
              <div className='ReviewBody'>{review.body}</div>
              <br></br>
              {review.recommend ?
                <div className='ReviewRecommend'>&#10003; I recommend this product!</div>
                : null
              }
              <div className='ReviewResponse'>{review.response}</div>
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