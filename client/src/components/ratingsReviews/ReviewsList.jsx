import React from 'react';
import Sort from './Sort.jsx';
import ReviewTile from './ReviewTile.jsx';
import NewReview from './NewReview.jsx';
import KeywordSearch from './KeywordSearch.jsx';

const ReviewsList = (props) => {
  const { reviews, sortOptions, handleReviewSort } = props;

  return (
    <div className='reviews-list'>
      <Sort
        reviews={reviews}
        sortOptions={sortOptions}
        handleReviewSort={handleReviewSort}/>
      <KeywordSearch />
      <br></br>
      <ReviewTile
        reviews={reviews}/>
      <NewReview />
    </div>
  );
};

export default ReviewsList;