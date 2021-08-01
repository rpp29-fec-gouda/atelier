import React from 'react';
import './readAllReviews.css';

const ReadAllReviews = (props) => {
  return (
    <div id="read-all-reviews">
      <a href="" class="row">Read all {props.number} reviews</a>
    </div>
  );
};

export default ReadAllReviews;