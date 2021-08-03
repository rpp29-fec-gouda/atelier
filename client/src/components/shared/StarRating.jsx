import React from 'react';
import roundByIncrement from '../../model/Calcs';
import './starRating.css';

// props: rating, max, callback
class StarRating extends React.Component {
  constructor(props) {
    super(props);

    this.maxStars = props.max ? props.max : 5;
    this.isClickable = (props.callback !== undefined);

    const rating = props.rating ? props.rating : 0;
    console.log('Rendering Star Rating');
    this.state = {
      currentRating: Math.min(rating, this.maxStars)
    };

    this.getStarsEmpty = this.getStarsEmpty.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  generateUrl(rating) {
    return `../public/img/starRatings-${rating}.png`;
  }

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

  getStarClasses(isClickable) {
    let imgClass = 'star';
    if (isClickable) {
      imgClass += ' clickable';
    }
    return imgClass;
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
    const starsFull = this.getStarsFull(this.state.currentRating);
    const starsEmpty = this.getStarsEmpty(this.state.currentRating);
    const ratingDecimalRounded25 = roundByIncrement(this.state.currentRating, 25) * 100;

    const imgClass = this.getStarClasses(this.isClickable);
    const callback = this.isClickable ? this.props.callback : () => {};
    const mouseOver = this.isClickable ? this.handleMouseOver : () => {};
    const mouseOut = this.isClickable ? this.handleMouseOut : () => {};

    let key = 0;
    return (
      <div class="star-rating" onMouseOut={mouseOut}>
        {
          starsFull.map(star =>
            <img
              key={key++}
              src={this.generateUrl(100)}
              class={imgClass}
              data-rating={key}
              onClick={callback}
              onMouseOver={mouseOver}
            ></img>
          )
        }
        {
          ratingDecimalRounded25 > 0 &&
          <img
            key={key++}
            src={this.generateUrl(ratingDecimalRounded25)}
            class={imgClass}
          ></img>
        }
        {
          starsEmpty.map(star =>
            <img
              key={key++}
              src={this.generateUrl(0)}
              class={imgClass}
              data-rating={key}
              onClick={callback}
              onMouseOver={mouseOver}
            ></img>
          )
        }
      </div>
    );
  }
}

export default StarRating;