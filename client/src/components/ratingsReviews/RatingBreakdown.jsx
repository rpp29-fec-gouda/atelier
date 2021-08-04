import React from 'react';
import RatingProgress from './RatingProgress.jsx';

const RatingBreakdown = (props) => {
  const { reviews, ratings, recommended } = props;
  console.log('reviews:', reviews);
  console.log('ratings:', ratings);
  const stars = [1, 1, 1, .8, 0];
  let key = 0;
  console.log('ratings:', ratings);

  const oneBar = parseInt(ratings[1]);
  const oneStar = oneBar * 1 || 0;
  const twoBar = parseInt(ratings[2]);
  const twoStar = twoBar * 2 || 0;
  const threeBar = parseInt(ratings[3]);
  const threeStar = threeBar * 3 || 0;
  const fourBar = parseInt(ratings[4]);
  const fourStar = fourBar * 4 || 0;
  const fiveBar = parseInt(ratings[5]);
  const fiveStar = fiveBar * 5 || 0;

  const sum = oneStar + twoStar + threeStar + fourStar + fiveStar;

  const test = sum / twoStar;

  const averageRating = sum / reviews.length;

  let averageRecommend = 0;

  if (!recommended.false) {
    averageRecommend = 100;
  } else {
    averageRecommend = Math.round(parseInt(recommended.true) / (parseInt(recommended.false) + parseInt(recommended.true)) * 100);
  }

  return (
    <div id='ratingBreakdown'>
      <span className='averageRating'>{averageRating}</span>
      <span>{stars.map(star => (
        <a key={key++}>{String.fromCharCode((star > 0) ? 9733 : 9734)}</a>
      ))}</span>
      <br></br><br></br>
      <div>{averageRecommend}% of reviews recommend this product</div>
      <br></br>
      <RatingProgress color='#00695c' completed='test'/>
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