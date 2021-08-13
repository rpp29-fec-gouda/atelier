/* eslint-disable camelcase */
import React from 'react';
import Sort from './Sort.jsx';
import ReviewTile from './ReviewTile.jsx';
import NewReview from './NewReview.jsx';
import KeywordSearch from './KeywordSearch.jsx';
import './reviewsList.css';

const ReviewsList = (props) => {
  const { loadMoreReviews, displayedReviews, reviewsLength, count, currentSort, product_id, getReviews, reviews, sortOptions, handleReviewSort } = props;

  const handleMoreReviews = () => {
    loadMoreReviews();
  };

  return (
    <div className='reviews-list'>
      <Sort
        reviews={displayedReviews}
        sortOptions={sortOptions}
        handleReviewSort={handleReviewSort} />
      <KeywordSearch />
      <div className='displayedReviews'>
        <ReviewTile
          reviews={displayedReviews} />
      </div>
      <div className='review-buttons'>
        {count < reviewsLength ?
          <div id='more-reviews' class='button uppercase' onClick={handleMoreReviews}>MORE REVIEWS</div>
          : null
        }
        <NewReview reviews={reviews} />
      </div>
    </div>
  );
};

export default ReviewsList;