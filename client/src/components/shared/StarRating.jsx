import React from 'react';
import { roundByIncrement } from '../../model/Calcs';
import './starRating.css';

// props: rating, max, callback
class StarRating extends React.Component {
  constructor(props) {
    super(props);

    this.maxStars = props.max ? props.max : 5;
    this.isClickable = (props.callback !== undefined);

    const rating = props.rating ? props.rating : 0;
    this.state = {
      currentRating: Math.min(rating, this.maxStars)
    };

    this.getStarsEmpty = this.getStarsEmpty.bind(this);
    this.getStarCodes = this.getStarCodes.bind(this);

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  // TODO
  // start section to extract to model
  getStarsFull(rating) {
    const ratingInteger = Math.floor(rating);
    const starsFull = [];
    for (let i = 0; i < ratingInteger; i++) {
      starsFull.push(i);
    }
    return starsFull;
  }

  getStarsEmpty(rating) {
    const ratingEmpty = this.maxStars - Math.ceil(rating);
    const starsEmpty = [];
    for (let i = 0; i < ratingEmpty; i++) {
      starsEmpty.push(i);
    }
    return starsEmpty;
  }

  getStarCodes(rating) {
    const starCodes = [];

    const starsFull = this.getStarsFull(rating);
    starsFull.forEach(() => starCodes.push(100));

    // Do not do this for a rating of 0 as this will introduce an extra empty star
    const ratingDecimalRounded25 = roundByIncrement(rating, 25) * 100;
    if (ratingDecimalRounded25 !== 0) {
      starCodes.push(ratingDecimalRounded25);
    }

    const starsEmpty = this.getStarsEmpty(rating);
    starsEmpty.forEach(() => starCodes.push(0));

    return starCodes;
  }
  // TODO
  // end section to extract to model

  getImage(rating) {
    return `images/starRatings-${rating}.png`;
  }

  getStarClasses(isClickable) {
    let imgClass = 'star';
    if (isClickable) {
      imgClass += ' clickable';
    }
    return imgClass;
  }

  handleOnClick(e) {
    this.props.callback(e);
  }

  handleMouseOver(e) {
    const rating = e?.target?.dataset?.rating;
    console.log('rating: ', rating);
    if (rating && rating !== this.state.currentRating) {
      console.log('Rating:', rating);
      this.setState({
        currentRating: rating
      });
    }
  }

  handleMouseOut() {
    const rating = this.props.rating ? this.props.rating : 0;
    this.setState({
      currentRating: rating
    });
  }

  render() {
    console.log('Rendering Star Rating');
    const starCodes = this.getStarCodes(this.state.currentRating);
    const imgClass = this.getStarClasses(this.isClickable);

    const optsStarRating = {};
    const optsStar = {};
    if (this.isClickable) {
      optsStarRating['onMouseOut'] = this.handleMouseOut;
      optsStar['onClick'] = this.handleOnClick;
      optsStar['onMouseOver'] = this.handleMouseOver;
    }

    let key = 0;
    return (
      <div class="star-rating" {...optsStarRating}>
        {
          starCodes.map(starCode =>
            <img
              key={key++}
              src={this.getImage(starCode)}
              class={imgClass}
              data-rating={key}
              {...optsStar}
            />
          )
        }
      </div>
    );
  }
}

export default StarRating;