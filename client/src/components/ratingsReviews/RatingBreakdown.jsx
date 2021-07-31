import React from 'react';

const RatingBreakdown = (props) => {
  const { reviews, ratings, recommended } = props;
  console.log('reviews:', reviews);
  console.log('ratings:', ratings);
  const stars = [1, 1, 1, .8, 0];
  let key = 0;
  console.log('ratings:', ratings);

  const oneStar = parseInt(ratings[1]) * 1 || 0;
  const twoStar = parseInt(ratings[2]) * 2 || 0;
  const threeStar = parseInt(ratings[3]) * 3 || 0;
  const fourStar = parseInt(ratings[4]) * 4 || 0;
  const fiveStar = parseInt(ratings[5]) * 5 || 0;

  const sum = oneStar + twoStar + threeStar + fourStar + fiveStar;
  // const allRatings = [];

  // for (let i = 1; i < 6; i++) {
  //   if (!isNaN(parseInt(ratings[i])) ) {
  //     allRatings.push(parseInt(ratings[i]));
  //   }
  // }

  const averageRating = sum / reviews.length;

  let averageRecommend = 0;

  if (!recommended.false) {
    averageRecommend = 100;
  } else {
    averageRecommend = Math.round(parseInt(recommended.true) / (parseInt(recommended.false) + parseInt(recommended.true)) * 100);
  }

  return (
    <div id='ratingBreakdown'>
      <span className='averageRating'>{averageRating} {stars.map(star => (
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