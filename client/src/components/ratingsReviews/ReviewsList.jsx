/* eslint-disable camelcase */
import React from 'react';
import Sort from './Sort.jsx';
import ReviewTile from './ReviewTile.jsx';
import NewReview from './NewReview.jsx';
import KeywordSearch from './KeywordSearch.jsx';
import './reviewsList.css';

const ReviewsList = (props) => {
  const {
    characteristics,
    callback,
    averageRating,
    selectedProduct,
    loadMoreReviews,
    displayedReviews,
    reviewsLength,
    count,
    reviews,
    sortOptions,
    handleReviewSort
  } = props;

  const handleMoreReviews = () => {
    loadMoreReviews();
  };

  return (
    <div id='rr-reviews-list' className='rr-reviews-list'>
      <Sort
        reviews={displayedReviews}
        sortOptions={sortOptions}
        handleReviewSort={handleReviewSort} />

      <KeywordSearch
        reviews={reviews}
        callback={callback} />
      <div id='rr-displayed-reviews' className='rr-displayed-reviews'>

        <ReviewTile
          reviews={displayedReviews}
          averageRating={averageRating} />
      </div>
      <div id='rr-review-buttons' className='rr-review-buttons'>
        {count < reviewsLength ?
          <div id='rr-more-reviews' class='button uppercase' onClick={handleMoreReviews}>MORE REVIEWS</div>
          : null
        }
        <NewReview
          reviews={reviews}
          selectedProduct={selectedProduct}
          characteristics={characteristics}
        />
      </div>
    </div>
  );
};

export default ReviewsList;