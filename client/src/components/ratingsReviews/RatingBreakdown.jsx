import React from 'react';
import RatingProgress from './RatingProgress.jsx';
import StarRating from '../shared/StarRating.jsx';

const RatingBreakdown = (props) => {
  const { reviews, ratings, recommended } = props;
  const stars = [1, 1, 1, .8, 0];
  let key = 0;

  const oneBar = parseInt(ratings[1]) || 0;
  const oneStar = oneBar * 1 || 0;
  const twoBar = parseInt(ratings[2]) || 0;
  const twoStar = twoBar * 2 || 0;
  const threeBar = parseInt(ratings[3]) || 0;
  const threeStar = threeBar * 3 || 0;
  const fourBar = parseInt(ratings[4]) || 0;
  const fourStar = fourBar * 4 || 0;
  const fiveBar = parseInt(ratings[5]) || 0;
  const fiveStar = fiveBar * 5 || 0;

  const sum = oneStar + twoStar + threeStar + fourStar + fiveStar;
  const sumBar = oneBar + twoBar + threeBar + fourBar + fiveBar;
  const averageRating = sum / sumBar;


  const barFills = [
    {percentage: oneBar / sumBar * 100},
    {percentage: twoBar / sumBar * 100},
    {percentage: threeBar / sumBar * 100},
    {percentage: fourBar / sumBar * 100},
    {percentage: fiveBar / sumBar * 100},
  ];

  let averageRecommend = 0;

  if (!recommended.false) {
    averageRecommend = 100;
  } else {
    averageRecommend = Math.round(parseInt(recommended.true) / (parseInt(recommended.false) + parseInt(recommended.true)) * 100);
  }

  return (
    <div id='rating-breakdown'>
      <span className='average-rating'>{isNaN(averageRating) ? '' : averageRating}</span>
      <span>{stars.map(star => (
        <a key={key++}>{String.fromCharCode((star > 0) ? 9733 : 9734)}</a>
      ))}</span>
      <br></br><br></br>
      <div>{averageRecommend}% of reviews recommend this product</div>
      <br></br>
      {barFills.map((item, i) => (
        <RatingProgress key={i} ratings={ratings} completed={item.percentage} />
      ))}

      <div>
        <div>5 stars bar</div>
        <div>4 stars bar</div>
        <div>3 stars bar</div>
        <div>2 stars bar</div>
        <div>1 star bar</div>
      </div>
    </div>
  );
};

export default RatingBreakdown;