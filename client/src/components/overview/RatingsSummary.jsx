import React from 'react';
import POClickTracker from '../trackers/POClickTracker';
import StarRating from '../shared/StarRating';
import './ratingsSummary.css';

const RatingsSummary = (props) => {
  const handleOnClick = () => {
    props.callback?.call();
    document.getElementById('rr-ratings-reviews-widget')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <span id="po-product-rating" class="row row-margin">
      {
        props.reviewCount > 0 ? (
          <React.Fragment>
            <StarRating
              rating={ props.averageRating }
            />
            <POClickTracker eventName="clickTracker" moduleName="Product Overview">
              <div id="po-read-all-reviews" onClick={handleOnClick} class="row link">
                Read all { props.reviewCount } reviews
              </div>
            </POClickTracker>
          </React.Fragment>
        ) : (
          <div>
            Loading Ratings Summary...
          </div>
        )
      }
    </span>
  );
};

export default RatingsSummary;