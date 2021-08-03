import React from 'react';

const NewReview = (props) => {
  return (
    <div id='newReview'>
      <h3>New Review</h3>
      <button className='moreReviews'>More Reviews</button>
      <button className='addReview'>Add a Review +</button>
    </div>
  );
};

export default NewReview;