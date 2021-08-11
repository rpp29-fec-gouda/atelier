import React from 'react';
import Sort from './Sort.jsx';
import ReviewTile from './ReviewTile.jsx';
import NewReview from './NewReview.jsx';
import KeywordSearch from './KeywordSearch.jsx';
import './reviewsList.css';

const ReviewsList = (props) => {
  const { reviews, sortOptions, handleReviewSort } = props;

  const handleMoreReviews = () => {
    console.log('More Clicked');
  };

  return (
    <div className='reviews-list'>
      <Sort
        reviews={reviews}
        sortOptions={sortOptions}
        handleReviewSort={handleReviewSort} />
      <KeywordSearch />
      <ReviewTile
        reviews={reviews} />
      <div className='review-buttons'>
        {reviews && reviews.length > 1 ?
          <div id='more-reviews' class='button uppercase' onClick={handleMoreReviews}>MORE REVIEWS</div>
          : <div>Loading...</div>
        }
        <NewReview />
      </div>
    </div>
  );
};

export default ReviewsList;