/* eslint-disable camelcase */
import React from 'react';
import RatingList from './RatingList.jsx';
import ReviewsList from './ReviewsList.jsx';
import axios from 'axios';
import '../css/RatingsReviews.css';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);

    this.reviews = [];
    this.ratings = [];
    this.characteristics = [];
    this.recommended = [];
    // eslint-disable-next-line camelcase
    this.product_id = '';

    this.state = {
      ratings: [],
      reviews: [],
      characteristics: [],
      recommended: {},
      // eslint-disable-next-line camelcase
      product_id: ''
    };

    this.getReviews = this.getReviews.bind(this);
    this.getRatings = this.getRatings.bind(this);
    this.getDefaultRatings = this.getDefaultRatings.bind(this);
    this.getDefaultReviews = this.getDefaultReviews.bind(this);
  }

  componentDidMount() {
    this.getReviews(this.props.selectedProduct.id);
    this.getRatings(this.props.selectedProduct.id);
  }

  getDefaultReviews() {
    console.log('1ID', this.product_id);
    console.log('1reviews:', this.reviews);
    if (this.reviews.length > 0) {
      console.log('2reviews:', this.reviews);
      console.log('2ID', this.product_id);

      this.setState({
        reviews: this.reviews,
        // eslint-disable-next-line camelcase
        product_id: this.product_id
      });
      return;
    }
    this.setState({
      product_id: this.product_id,
      reviews: null
    });
  }

  getDefaultRatings() {
    console.log('1ratings:', this.ratings);
    if (Object.keys(this.ratings).length !== 0) {
      console.log('2ratings:', this.ratings);

      this.setState({
        ratings: this.ratings,
        characteristics: this.characteristics,
        recommended: this.recommended
      });
      console.log('state', this.state);
      return;
    }
    this.setState({
      ratings: null
    });
  }

  getReviews(id) {
    console.log('Getting Reviews');
    axios.get(`reviews?product_id=${id}`)
      .then(res => {
        console.log('getReviews:', res);
        this.reviews = res.data.results;
        // eslint-disable-next-line camelcase
        this.product_id = res.data.product;
        this.getDefaultReviews();

      })
      .catch(err => {
        console.log(err.stack);
      });
  }

  getRatings(id) {
    console.log('Getting Ratings');
    axios.get(`reviews/meta?product_id=${id}`)
      .then(res => {
        console.log('getRatings:', res);
        if (res.data.ratings) {

          this.ratings = res.data.ratings;
          console.log('ReRatings', this.ratings);
          this.getDefaultRatings();
        }

      })
      .catch(err => {
        console.log(err.stack);
      });
  }


  componentDidUpdate() {
    if (this.props.selectedProduct.id && parseInt(this.state.product_id)) {
      if (parseInt(this.state.product_id) !== this.props.selectedProduct.id) {
        this.getReviews(this.props.selectedProduct.id);
        this.getRatings(this.props.selectedProduct.id);
      }
    }
  }

  render() {
    const selectedProduct = this.props.selectedProduct;
    if (selectedProduct === null) {
      return (<p>Loading...</p>);
    }

    return (
      <div id='RatingsReviews'>
        <span className='componentTitle'>RATINGS & REVIEWS</span>
        <div id='Ratings'>
          <ReviewsList
            reviews={this.state.reviews} />
          <RatingList
            ratings={this.state.ratings}
            reviews={this.state.reviews}
            characteristics={this.state.characteristics}
            recommended={this.state.recommended} />
        </div>
      </div>
    );
  }
}

export default RatingsAndReviews;