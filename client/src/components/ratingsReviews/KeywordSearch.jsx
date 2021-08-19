import React from 'react';
import './keywordSearch.css';

const KeywordSearch = (props) => {
  const { reviews, callback } = props;
  let filteredReviews = [];

  const handleOnChange = (e) => {
    const search = e.target.value;
    if (search.length >= 3) {
      reviews.forEach((review) => {
        const body = review.body;
        const summary = review.summary;
        if (body.includes(search) || summary.includes(search)) {
          filteredReviews.push(review);
        }
      });

      if (filteredReviews.length !== 0) {
        callback(filteredReviews);
      }
    }
    if (search.length < 3) {
      filteredReviews = null;
      callback(filteredReviews);
    }
  };

  return (
    <div id='keyword-search'>
      <label for="rr-search-bar"></label>
      <input
        className="rr-search-bar"
        type="text"
        placeholder="SEARCH FOR REVIEWS..."
        name="search"
        onChange={handleOnChange}>
      </input>
    </div>
  );
};

export default KeywordSearch;

