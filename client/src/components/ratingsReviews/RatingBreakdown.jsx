import React from 'react';
import RatingProgress from './RatingProgress.jsx';
import StarRating from '../shared/StarRating.jsx';
import './ratingBreakdown.css';

const RatingBreakdown = (props) => {
  const { ratings, recommended, handleRatingProgressFilter, ratingDetails } = props;
  const stars = [1, 1, 1, .8, 0];
  let key = 0;

  if (ratings) {
    console.log('ratings:', ratings);
    const ratingsArr = Object.entries(ratings);
    console.log('ratingsArr:', ratingsArr);

    let valueRatings = 0;
    let totalRatings = 0;

    ratingsArr.forEach(rating => {
      let ratingNumber = parseInt(rating[1]);
      totalRatings += ratingNumber;
      valueRatings += parseInt(rating[0]) * parseInt(rating[1]);
    });

    console.log('Total Number of Ratings: ', totalRatings);
    console.log('Total Value of Ratings: ', valueRatings);

    const oneBar = parseInt(ratings[1]) || 0;
    const twoBar = parseInt(ratings[2]) || 0;
    const threeBar = parseInt(ratings[3]) || 0;
    const fourBar = parseInt(ratings[4]) || 0;
    const fiveBar = parseInt(ratings[5]) || 0;

    let averageRating = Math.round(valueRatings / totalRatings * 10) / 10;

    ratingDetails(averageRating, totalRatings);

    const barFills = [
      { star: '5 stars', count: fiveBar, percentage: fiveBar / totalRatings * 100 },
      { star: '4 stars', count: fourBar, percentage: fourBar / totalRatings * 100 },
      { star: '3 stars', count: threeBar, percentage: threeBar / totalRatings * 100 },
      { star: '2 stars', count: twoBar, percentage: twoBar / totalRatings * 100 },
      { star: '1 stars', count: oneBar, percentage: oneBar / totalRatings * 100 },
    ];

    console.log('BarFills', barFills);

    let averageRecommend = 0;
    if (!recommended.false) {
      averageRecommend = 100;
    } else {
      averageRecommend = Math.round(parseInt(recommended.true) / (parseInt(recommended.false) + parseInt(recommended.true)) * 100);
    }

    return (
      <div id='rating-breakdown'>
        <span className='rating-breakdown average-rating'>{isNaN(averageRating) ? '' : averageRating}</span>
        <span>{stars.map(star => (
          <a key={key++}>{String.fromCharCode((star > 0) ? 9733 : 9734)}</a>
        ))}</span>
        <br></br><br></br>
        <div>{averageRecommend}% of reviews recommend this product</div>
        <br></br>
        <h5>RATING BREAKDOWN</h5>
        {barFills.map((item, i) => (
          <RatingProgress key={i} ratings={ratings} completed={item} handleRatingProgressFilter={handleRatingProgressFilter} />
        ))}
      </div>
    );
  } else {
    return (
      <div id='rating-breakdown'></div>
    );
  }

};

export default RatingBreakdown;