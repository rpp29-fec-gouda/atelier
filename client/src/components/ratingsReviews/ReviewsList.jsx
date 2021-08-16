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
    selectedProduct,
    loadMoreReviews,
    displayedReviews,
    reviewsLength,
    count,
    currentSort,
    product_id,
    getReviews,
    reviews,
    sortOptions,
    handleReviewSort
  } = props;

  const handleMoreReviews = () => {
    loadMoreReviews();
  };

  return (
    <div className='rr-reviews-list'>
      <Sort
        reviews={displayedReviews}
        sortOptions={sortOptions}
        handleReviewSort={handleReviewSort} />
      <KeywordSearch />
      <div className='rr-displayed-reviews'>
        <ReviewTile
          reviews={displayedReviews} />
      </div>
      <div className='rr-review-buttons'>
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