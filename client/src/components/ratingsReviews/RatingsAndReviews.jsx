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
    this.product_id = '';
    this.sort = 'relevant';

    this.state = {
      ratings: [],
      reviews: [],
      characteristics: [],
      recommended: {},
      product_id: '',
      sort: 'relevant'
    };

    this.sortOptions = ['relevance', 'newest', 'helpfulness'];


    this.getReviews = this.getReviews.bind(this);
    this.getRatings = this.getRatings.bind(this);
    this.getDefaultRatings = this.getDefaultRatings.bind(this);
    this.getDefaultReviews = this.getDefaultReviews.bind(this);
    this.handleReviewSort = this.handleReviewSort.bind(this);
    this.handleRatingProgressFilter = this.handleRatingProgressFilter.bind(this);
  }

  componentDidMount() {
    if (this.props.selectedProduct) {
      this.getReviews(this.state.sort, this.props.selectedProduct.id);
      this.getRatings(this.props.selectedProduct.id);
    } else {
      return <div>Loading...</div>;
    }
  }

  getDefaultReviews() {
    console.log('1ID', this.product_id);
    console.log('1reviews:', this.reviews);
    if (this.reviews.length > 0) {
      console.log('2reviews:', this.reviews);
      console.log('2ID', this.product_id);

      this.setState({
        reviews: this.reviews,
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

  getReviews(sort, id) {
    console.log('Getting Reviews');
    axios.get(`reviews?sort=${sort}&product_id=${id}`)
      .then(res => {
        console.log('getReviews:', res);
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
        console.log('getRatings:', res);
        if (res.data.ratings) {

          this.ratings = res.data.ratings;
          this.characteristics = res.data.characteristics;
          console.log('ReRatings', this.ratings);
          this.getDefaultRatings();
        }
      })
      .catch(err => {
        console.log(err.stack);
      });
  }

  componentDidUpdate(prevState) {
    if (this.props.selectedProduct.id && parseInt(this.state.product_id)) {
      if (parseInt(this.state.product_id) !== this.props.selectedProduct.id) {
        this.getReviews(this.state.sort, this.props.selectedProduct.id);
        this.getRatings(this.props.selectedProduct.id);
      }
    }
  }



  handleReviewSort (event) {
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
      return (<p>Loading...</p>);
    }

    return (
      <div id='ratings-reviews'>
        <span className='component-title'>RATINGS &amp; REVIEWS</span>
        <div id='ratings'>
          <ReviewsList
            reviews={this.state.reviews}
            sortOptions={this.sortOptions}
            handleReviewSort={this.handleReviewSort} />
          <RatingList
            ratings={this.state.ratings}
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