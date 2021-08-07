import React from 'react';
import { incrementIndexUp, incrementIndexDown } from '../../model/Calcs';
import './scrollingArrows.css';

// props: index, isCapped, max, min, stem
class ScrollingArrows extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: props.index ? props.index : 0
    };

    this.min = props.min ? props.min : 0;

    this.decrementClass = 'decrement';
    this.decrementClass += props.stem ? ' decrement-stem' : ' decrement-no-stem';

    this.incrementClass = 'increment';
    this.incrementClass += props.stem ? ' increment-stem' : ' increment-no-stem';

    this.incrementIndexUp = this.incrementIndexUp.bind(this);
    this.incrementIndexDown = this.incrementIndexDown.bind(this);
  }

  incrementIndexUp() {
    let index = this.state.index;
    let max = this.props.max;
    let isCapped = this.props.isCapped;

    index = incrementIndexUp(index, max, isCapped);

    this.props.onClickIncrement(index);
    this.setState({
      index: index
    });
  }

  incrementIndexDown() {
    let index = this.state.index;
    let max = this.props.max;
    let min = this.min;
    let isCapped = this.props.isCapped;

    index = incrementIndexDown(index, max, min, isCapped);

    this.props.onClickDecrement(index);
    this.setState({
      index: index
    });
  }

  render() {
    return (
      <div class="scrolling-arrows">
        <div class={this.decrementClass} onClick={this.incrementIndexDown}></div>
        <div class={this.incrementClass} onClick={this.incrementIndexUp}></div>
      </div>
    );
  }
}

export default ScrollingArrows;