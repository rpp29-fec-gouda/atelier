import React from 'react';
import './scrollingArrows.css';

// props: index, isCapped, max, min, stem
const ScrollingArrows = (props) => {
  let index = props.index ? props.index : 0;
  let min = props.min ? props.min : 0;
  let decrementClass = 'decrement';
  decrementClass += props.stem ? ' decrement-stem' : ' decrement-no-stem';
  let incrementClass = 'increment';
  incrementClass += props.stem ? ' increment-stem' : ' increment-no-stem';

  const incrementIndexUp = () => {
    index++;
    if (props.max && index >= props.max) {
      index = props.isCapped ? props.max : 0;
    }
    props.onClickIncrement(index);
  };

  const incrementIndexDown = () => {
    index--;
    if (index < min) {
      if (props.isCapped) {
        index = props.min;
      } else if (props.max) {
        index = props.max - 1;
      }
    }
    props.onClickDecrement(index);
  };

  return (
    <div class="scrolling-arrows">
      <div class={decrementClass} onClick={incrementIndexDown}></div>
      <div class={incrementClass} onClick={incrementIndexUp}></div>
    </div>
  );
};

export default ScrollingArrows;