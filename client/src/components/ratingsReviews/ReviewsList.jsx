import React from 'react';
import Sort from './Sort.jsx';
import ReviewTile from './ReviewTile.jsx';
import NewReview from './NewReview.jsx';
import KeywordSearch from './KeywordSearch.jsx';

const ReviewsList = (props) => {
  const { reviews } = props;

  return (
    <div className='ReviewsList'>
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