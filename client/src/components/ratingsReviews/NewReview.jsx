import React from 'react';
import AddButton from '../shared/AddButton.jsx';

const NewReview = (props) => {

  const handleAddReview = () => {
    console.log('Add Clicked');

  };

  const handleMoreReviews = () => {
    console.log('More Clicked');
  };

  return (
    <div id='new-review'>
      <h3>New Review</h3>
      <span id='more-reviews' class='button uppercase' onClick={handleMoreReviews}>MORE REVIEWS</span>
      <span id='add-review' class='button uppercase' onClick={handleAddReview}>ADD A REVIEW<div class='plus'>+</div></span>
    </div>
  );
};

export default NewReview;