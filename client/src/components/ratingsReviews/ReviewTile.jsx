import React from 'react';

const ReviewTile = (props) => {
  const { reviews } = props;
  let key = 0;

  return reviews.length ? (
    <div id='reviewTile'>
      <div className='Tile'>
        {reviews.map((review) => (
          <div key={key++}>
            <div className='userStamp'>
              <span className='ReviewRating'>{review.rating}</span>
              <span className='ReviewerName'>{review.reviewer_name}</span>
              <span className='ReviewDate'>{new Date(review.date).toDateString()}</span>
            </div>
            <br></br>
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
              <span className='ReviewHelpfulness'>Helpful? Yes({review.helpfulness})</span>
              <span> | </span>
              <span className='ReviewReport'>Report</span>
              <hr></hr>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (<p>Loading...</p>);
};

export default ReviewTile;