import React from 'react';
import Sort from './Sort.jsx';
import ReviewTile from './ReviewTile.jsx';
import NewReview from './NewReview.jsx';
import KeywordSearch from './KeywordSearch.jsx';

const ReviewsList = (props) => {
  const { reviews } = props;
  console.log('reviews:', reviews);

  return (
    <div className='reviews-list'>
      <Sort
        reviews={reviews}/>
      <KeywordSearch />
      <br></br>
      <ReviewTile
        reviews={reviews}/>
      <NewReview />
    </div>
  );
};

export default ReviewsList;