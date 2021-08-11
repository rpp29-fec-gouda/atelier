/* eslint-disable camelcase */
import React from 'react';
import RatingList from './RatingList.jsx';
import ReviewsList from './ReviewsList.jsx';
import axios from 'axios';
import './ratingsAndReviews.css';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);

    this.reviews = [];
    this.averageRating = 0;
    this.totalRating = 0;
    this.ratings = {};
    this.characteristics = {};
    this.recommended = {};
    this.product_id = '';
    this.sort = 'relevant';

    this.state = {
      ratings: {},
      reviews: [],
      characteristics: {},
      recommended: {},
      product_id: '',
      sort: 'relevant'
    };

    this.sortOptions = ['relevance', 'newest', 'helpfulness'];

    this.getReviews = this.getReviews.bind(this);
    this.getRatings = this.getRatings.bind(this);
    this.getDefaultRatings = this.getDefaultRatings.bind(this);
    this.ratingDetails = this.ratingDetails.bind(this);
    this.getDefaultReviews = this.getDefaultReviews.bind(this);
    this.handleReviewSort = this.handleReviewSort.bind(this);
    this.handleRatingProgressFilter = this.handleRatingProgressFilter.bind(this);
  }

  getReviews(sort, id) {
    console.log('Getting Reviews');
    axios.get(`reviews?sort=${sort}&product_id=${id}`)
      .then(res => {
        console.log('AXIOS GET REVIEWS:', res);
        this.reviews = res.data.results;
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
        console.log('AXIOS GET RATINGS:', res);
        this.ratings = res.data.ratings;
        this.characteristics = res.data.characteristics;
        this.recommended = res.data.recommended;
        this.getDefaultRatings();
      })
      .catch(err => {
        console.log(err.stack);
      });
  }

  ratingDetails(averageRating, totalRating) {
    this.averageRating = averageRating;
    this.totalRating = totalRating;
  }

  getDefaultReviews() {
    const { reviews, product_id } = this;
    this.props.updateReviews(reviews);

    if (this.reviews.length > 0) {
      this.setState({
        reviews: this.reviews,
        product_id: product_id
      });
      return;
    }
    this.setState({
      product_id: product_id,
      reviews: null
    });
  }

  getDefaultRatings() {
    const { ratings, characteristics, recommended, averageRating, totalRating } = this;
    this.props.updateRatings(ratings, characteristics, recommended, averageRating, totalRating);

    if (Object.keys(ratings).length) {
      this.setState({
        ratings: ratings,
      });
    }

    if (Object.keys(recommended).length) {
      this.setState({
        recommended: recommended,
      });
    }

    if (Object.values(characteristics)[0].value !== null) {
      this.setState({
        characteristics: characteristics,
      });
      return;
    }

    this.setState({
      ratings: null,
      recommended: {},
      characteristics: {}
    });
  }

  componentDidMount() {
    if (this.props.selectedProduct) {
      this.getReviews(this.state.sort, this.props.selectedProduct.id);
      this.getRatings(this.props.selectedProduct.id);
    } else {
      return <div>Loading...</div>;
    }
  }

  componentDidUpdate(prevState) {
    if (this.props.selectedProduct.id && parseInt(this.state.product_id)) {
      if (parseInt(this.state.product_id) !== this.props.selectedProduct.id) {
        this.getReviews(this.state.sort, this.props.selectedProduct.id);
        this.getRatings(this.props.selectedProduct.id);
      }
    }
  }

  handleReviewSort(event) {
    const sortFilter = event.target.value;
    if (sortFilter === 'relevance') {
      this.setState({
        sort: 'relevant'
      }, () => {
        this.getReviews(this.state.sort, this.props.selectedProduct.id);

      });
    } else if (sortFilter === 'helpfulness') {
      this.setState({
        sort: 'helpful'
      }, () => {
        this.getReviews(this.state.sort, this.props.selectedProduct.id);

      });
    } else if (sortFilter === 'newest') {
      this.setState({
        sort: 'newest'
      }, () => {
        this.getReviews(this.state.sort, this.props.selectedProduct.id);

      });
    }
    event.preventDefault();
  }

  handleRatingProgressFilter(event) {
    console.log('stars', event.target.id);
    event.preventDefault();
  }

  render() {
    const selectedProduct = this.props.selectedProduct;
    if (selectedProduct === null) {
      return (<div>Loading...</div>);
    }

    return (
      <div id='ratings-reviews-widget'>
        <h3 className='component-title'>RATINGS &amp; REVIEWS</h3>
        <div id='ratings-reviews'>
          <ReviewsList
            reviews={this.state.reviews}
            sortOptions={this.sortOptions}
            handleReviewSort={this.handleReviewSort} />
          <RatingList
            ratings={this.state.ratings}
            ratingDetails={this.ratingDetails}
            averageRating={this.averageRating}
            totalRating={this.totalRating}
            reviews={this.state.reviews}
            characteristics={this.state.characteristics}
            recommended={this.state.recommended}
            handleRatingProgressFilter={this.handleRatingProgressFilter}
          />
        </div>
      </div>
    );
  }
}

export default RatingsAndReviews;