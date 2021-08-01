import React from 'react';

const RatingProgress = (props) => {
  const { completed, ratings } = props;
  console.log('completed:', completed);

  const ratingProgress = {
    width: '100%',
    backgroundColor: '#e0e0de',
  };

  const ratingFiller = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: '#00695c',
    borderRadius: 'inherit',
    marginTop: '5%',
    marginBottom: '5%'
  };

  const stars = [{star: 5},
    {star: 4},
    {star: 3},
    {star: 2},
    {star: 1}
  ];

  return (
    <div style={ratingProgress}>
      <div style={ratingFiller}>
        {stars.map((star, i) => {
          return <span key={i}>''</span>;
        })}
        <span style={ratingFiller}></span>
      </div>
    </div>
  );
};

export default RatingProgress;