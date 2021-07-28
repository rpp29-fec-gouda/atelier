import React from 'react';

const RatingBreakdown = (props) => {
  const { ratings, recommended } = props;
  const stars = [1, 1, 1, .8, 0];
  let key = 0;
  console.log('ratings:', ratings);

  if (!recommended.false) {
    var averageRecommend = 100;
  } else {
    var averageRecommend = Math.round(100 / (parseInt(recommended.false) + parseInt(recommended.true)) * parseInt(recommended.true));
  }

  return (
    <div id='ratingBreakdown'>
      <span>4 {stars.map(star => (
        <a key={key++}>{String.fromCharCode((star > 0) ? 9733 : 9734)}</a>
      ))}</span>
      <br></br><br></br>
      <div>{averageRecommend}% of reviews recommend this product</div>
      <br></br>
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