import React from 'react';
import { incrementIndexUp, incrementIndexDown } from '../../model/Calcs';
import './scrollingArrows.css';

// props: index, isCapped, max, min, stem
class ScrollingArrows extends React.Component {
  constructor(props) {
    super(props);

    this.min = props.min ? props.min : 0;

    this.state = {
      index: props.index ? props.index : this.min
    };

    this.decrementClass = 'scrolling-arrows-arrow scrolling-arrows-decrement';
    this.decrementArrowClass = props.stem ? 'scrolling-arrows-decrement-stem' : 'scrolling-arrows-decrement-no-stem';
    this.decrementClass += ` ${this.decrementArrowClass}`;

    this.incrementClass = 'scrolling-arrows-arrow scrolling-arrows-increment';
    this.incrementArrowClass = props.stem ? 'scrolling-arrows-increment-stem' : 'scrolling-arrows-increment-no-stem';
    this.incrementClass += ` ${this.incrementArrowClass}`;

    this.incrementIndexUp = this.incrementIndexUp.bind(this);
    this.incrementIndexDown = this.incrementIndexDown.bind(this);
    this.updateIndex = this.updateIndex.bind(this);
    this.getSvgData = this.getSvgData.bind(this);

    this.svgs = {
      noStem: {
        'viewBox': '0,0,837,1000',
        'scrolling-arrows-decrement': 'M837.371+928.018L309.729+499.992L837.371+71.9816L778.965+0L162.629+499.992L778.965+1000L837.371+928.018Z',
        'scrolling-arrows-increment': 'M-0.371452+928.018L527.271+499.992L-0.371452+71.9816L58.0347+0L674.371+499.992L58.0347+1000L-0.371452+928.018Z',
      },
      stem: {
        'viewBox': '0,0,159,159',
        'scrolling-arrows-decrement': 'M159.523+65.2232L59.7936+65.2232L102.39+22.628L79.7608+0L0+79.7616L79.7608+159.523L102.39+136.895L59.7936+94.3008L159.523+94.3008L159.523+65.2232Z',
        'scrolling-arrows-increment': 'M-0.523205+93.7768L99.2064+93.7768L56.6104+136.372L79.2392+159L159+79.2384L79.2392-0.523205L56.6104+22.1048L99.2064+64.6992L-0.523205+64.6992L-0.523205+93.7768Z',
      }};
  }

  getSvgData(item) {
    const typeKey = this.props.stem ? 'stem' : 'noStem';
    return this.svgs[typeKey][item];
  }

  incrementIndexUp() {
    let index = this.state.index;
    let max = this.props.max;
    let min = this.props.min;
    let isCapped = this.props.isCapped;

    index = incrementIndexUp(index, max, min, isCapped);
    this.updateIndex(index);
  }

  incrementIndexDown() {
    let index = this.state.index;
    let max = this.props.max;
    let min = this.min;
    let isCapped = this.props.isCapped;

    index = incrementIndexDown(index, max, min, isCapped);
    this.updateIndex(index);
  }

  updateIndex(index) {
    if (this.props.callback) {
      this.props.callback(index);
    }
    this.setState({
      index: index
    });
  }

  render() {
    return (
      <div class="scrolling-arrows">
        {
          !(this.props.isCapped && this.state.index === this.props.min) &&
          <div class={this.decrementClass} onClick={this.incrementIndexDown}>
            <svg viewBox={this.getSvgData('viewBox')}>
              <path d={this.getSvgData('scrolling-arrows-decrement')} />
            </svg>
          </div>
        }
        {
          !(this.props.isCapped && this.state.index === this.props.max) &&
          <div class={this.incrementClass} onClick={this.incrementIndexUp}>
            <svg viewBox={this.getSvgData('viewBox')}>
              <path d={this.getSvgData('scrolling-arrows-increment')} />
            </svg>
          </div>
        }
      </div>
    );
  }
}

export default ScrollingArrows;