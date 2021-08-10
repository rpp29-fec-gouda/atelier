import React from 'react';
import Sort from './Sort.jsx';
import ReviewTile from './ReviewTile.jsx';
import NewReview from './NewReview.jsx';
import KeywordSearch from './KeywordSearch.jsx';

const ReviewsList = (props) => {
  const { reviews, sortOptions, handleReviewSort } = props;

  if (reviews) {
    var displayedReviews = reviews.splice(0, 2);
    console.log('displayedReviews:', displayedReviews);
  }

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
      <br></br>
      {reviews ?
        <ReviewTile
          reviews={reviews} /> : <p>Loading...</p>}
      {reviews && reviews.length > 1 ?
        <div id='more-reviews' class='button uppercase' onClick={handleMoreReviews}>MORE REVIEWS</div>
        : null
      }
      <NewReview />
    </div>
  );
};

export default ReviewsList;