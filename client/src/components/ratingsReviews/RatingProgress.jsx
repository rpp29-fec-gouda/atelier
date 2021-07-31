import React from 'react';

const ProgressBar = (props) => {
  const {color, completed} = props;
  return (
    <div className='ratingProgress'>
      <div className='ratingFiller'>
        <span>{completed}</span>
      </div>
    </div>
  );
};

export default ProgressBar;