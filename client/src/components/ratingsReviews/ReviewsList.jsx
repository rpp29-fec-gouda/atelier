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
    handleReviewSort,
    expanded,
    expandBody
  } = props;

  const handleMoreReviews = () => {
    loadMoreReviews();
  };

  return (
    <div className='rr-reviews-list'>
      <Sort
        reviews={displayedReviews}
        fullReviews={reviews}
        sortOptions={sortOptions}
        handleReviewSort={handleReviewSort} />

      <KeywordSearch
        reviews={reviews}
        callback={callback} />

      <div className='rr-displayed-reviews'>
        <ReviewTile
          reviews={displayedReviews}
          fullReviews={reviews}
          averageRating={averageRating}
          expanded={expanded}
          expandBody={expandBody}/>
      </div>
      <div className='rr-review-buttons'>
        {count < reviewsLength ?
          <div className='rr-more-reviews' class='button uppercase' onClick={handleMoreReviews}>MORE REVIEWS</div>
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