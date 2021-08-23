/* eslint-disable camelcase */
import React from 'react';
import RatingList from './RatingList.jsx';
import ReviewsList from './ReviewsList.jsx';
import NewReview from './NewReview.jsx';
import axios from 'axios';
import './ratingsAndReviews.css';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);

    this.reviews = [];
    this.reviewsData = {};
    this.ratingsData = {};
    this.displayedReviews = [];
    this.filteredRatings = [];
    this.averageRating = 0;
    this.roundedAverage = 0;
    this.totalRating = 0;
    this.ratings = {};
    this.characteristics = {};
    this.recommended = {};
    this.product_id = '';
    this.sort = 'relevant';

    this.state = {
      ratings: {},
      reviews: [],
      reviewsLength: 0,
      displayedReviews: [],
      filteredReviews: null,
      filteredRatings: [],
      characteristics: {},
      recommended: {},
      product_id: '',
      count: 2,
      sort: 'relevant',
      expanded: false,
      '5': false,
      '4': false,
      '3': false,
      '2': false,
      '1': false
    };

    this.sortOptions = ['relevance', 'newest', 'helpfulness'];

    this.getReviews = this.getReviews.bind(this);
    this.getRatings = this.getRatings.bind(this);
    this.getDefaultRatings = this.getDefaultRatings.bind(this);
    this.getDefaultReviews = this.getDefaultReviews.bind(this);
    this.handleReviewSort = this.handleReviewSort.bind(this);
    this.handleRatingProgressFilter = this.handleRatingProgressFilter.bind(this);
    this.loadMoreReviews = this.loadMoreReviews.bind(this);
    this.handleInteractions = this.handleInteractions.bind(this);
    this.updateReviewsList = this.updateReviewsList.bind(this);
    this.expandBody = this.expandBody.bind(this);
    this.updateRatingsList = this.updateRatingsList.bind(this);
    this.ratingDetails = this.ratingDetails.bind(this);

  }

  getReviews(sort, count, id, callback = () => { }) {
    const { checkCache, updateCache } = this.props;
    let reviews = checkCache('reviews', id);

    if (reviews) {
      callback(reviews);
    } else {
      console.log(`🌻🌻🌻 GET request for Reviews of product id ${id} 🌻🌻🌻`);
      axios.get(`reviews?sort=${sort}&count=100&product_id=${id}`)
        .then(res => {
          // console.log('🌻🌻🌻🌻 AXIOS GET REVIEWS 1 🌻🌻🌻🌻:', res);
          console.log(`🌻 New reviews associated with product ID ${id} 🌻`, JSON.stringify(res.data));
          updateCache('reviews', id, res.data);
          callback(reviews);

          this.reviewsData = res.data;
          this.reviews = res.data.results;
          this.displayedReviews = res.data.results.slice();
          this.product_id = res.data.product;
          this.getDefaultReviews();
        })
        .catch(err => {
          console.log(err.stack);
        });
    }
  }

  ratingDetails(averageRating, totalRating, roundedAverage) {
    this.averageRating = averageRating;
    this.totalRating = totalRating;
    this.roundedAverage = roundedAverage;
  }

  getRatings(id, callback = () => { }) {

    const { checkCache, updateCache } = this.props;
    let ratings = checkCache('ratings', id);

    if (ratings) {
      callback(ratings);
    } else {
      console.log(`🌻🌻🌻 GET request for RATINGS of product id ${id} 🌻🌻🌻`);
      axios.get(`reviews/meta?product_id=${id}`)
        .then(res => {
          // console.log('🌻🌻🌻🌻 AXIOS GET RATINGS 1 🌻🌻🌻🌻:', res);
          // console.log(`New ratings associated with product ID ${id}`, JSON.stringify(res.data.ratings));
          console.log(`🌻 New ratings associated with product ID ${id} 🌻`, JSON.stringify(res.data));
          updateCache('ratings', id, res.data);
          callback(ratings);
          this.ratingsData = res.data;
          this.ratings = res.data.ratings;
          this.characteristics = res.data.characteristics;
          console.log('this.characteristics:', this.characteristics);
          this.recommended = res.data.recommended;
          this.getDefaultRatings();
        })
        .catch(err => {
          console.log(err.stack);
        });
    }
  }

  getDefaultReviews() {
    const { reviewsData, reviews, displayedReviews, product_id } = this;
    const { updateCache } = this.props;

    updateCache('reviews', product_id, reviewsData);

    if (this.reviews.length > 0) {
      this.setState({
        reviews: this.reviews,
        reviewsLength: this.reviews.length,
        displayedReviews: displayedReviews.splice(0, 2),
        product_id: product_id,
        count: 2,
      });
      return;
    }
    this.setState({
      product_id: product_id,
      reviews: null
    });
  }

  getDefaultRatings() {
    const { ratingsData, ratings, characteristics, recommended, product_id } = this;
    const { updateCache } = this.props;
    updateCache('ratings', product_id, ratingsData);

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
      this.getReviews(this.state.sort, this.state.count, this.props.selectedProduct.id);
      this.getRatings(this.props.selectedProduct.id);
    } else {
      return <div>Loading...</div>;
    }
  }

  componentDidUpdate(prevState) {
    if (this.props.selectedProduct.id && parseInt(this.state.product_id)) {
      if (parseInt(this.state.product_id) !== this.props.selectedProduct.id) {
        this.getReviews(this.state.sort, this.state.count, this.props.selectedProduct.id);
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
        this.getReviews(this.state.sort, this.state.count, this.props.selectedProduct.id);

      });
    } else if (sortFilter === 'helpfulness') {
      this.setState({
        sort: 'helpful'
      }, () => {
        this.getReviews(this.state.sort, this.state.count, this.props.selectedProduct.id);

      });
    } else if (sortFilter === 'newest') {
      this.setState({
        sort: 'newest'
      }, () => {
        this.getReviews(this.state.sort, this.state.count, this.props.selectedProduct.id);

      });
    }
    event.preventDefault();
  }

  updateReviewsList(filteredList) {
    this.setState({
      filteredReviews: filteredList
    });
  }

  updateRatingsList(filteredList) {
    this.setState({
      filteredRatings: filteredList
    }, () => {

      console.log('TEST1:', this.state.filteredRatings);
    });
  }

  handleRatingProgressFilter(event) {
    let filteredRatings = [];
    let starFilter = event.target.id;

    if (this.state[starFilter]) {
      console.log('Star Filter is true');
      this.setState({
        [starFilter]: false
      }, () => {
        console.log('Ratings before cut:', filteredRatings);
        this.state.reviews.forEach((review) => {
          const rating = review.rating;

          if (rating === parseInt(starFilter)) {
            filteredRatings.splice(filteredRatings.indexOf(review), 1);
            console.log('Cut out former ratings:', filteredRatings);
          }
        });
        if (filteredRatings.length === 0) {
          filteredRatings = null;
          console.log('Length is zero, should be null:', filteredRatings);
          this.updateRatingsList(filteredRatings);
        }
      });
    } else {
      console.log('Star Filter is false');
      this.setState({
        [starFilter]: true
      }, () => {
        console.log('Ratings before add', filteredRatings);
        this.state.reviews.forEach((review) => {
          const rating = review.rating;
          if (rating === parseInt(starFilter)) {
            filteredRatings.push(review);
            console.log('Ratings after add:', filteredRatings);

          }
          if (filteredRatings.length !== 0) {
            this.updateRatingsList(filteredRatings);
            console.log('Length is greater than zero:', filteredRatings);
          }
        });
      });
    }
  }

  loadMoreReviews() {
    this.setState((prevState) => ({
      count: prevState.count + 2,
      displayedReviews: prevState.displayedReviews.concat(this.displayedReviews.splice(0, 2))
    }));
  }

  handleInteractions(e) {
    e.persist();
    console.log('HANDLE INTERACTIONS ELEMENT:', e.target.id);
    let data, url;
    let time = new Date();

    url = '/interactions';
    data = {
      'element': e.target.id || e.target.className,
      widget: 'reviews',
      time: time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + '-' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
    };

    axios.post(url, data)
      .then(res => {
        console.log('🌻🌻🌻🌻 AXIOS POST INTERACTIONS 1 🌻🌻🌻🌻: ', res);
      })
      .catch(err => console.log('Submit error', err));
  }

  expandBody(e) {
    let value = e.target.id;
    console.log('value:', value);
    this.setState({
      expanded: true
    });
  }

  render() {
    const selectedProduct = this.props.selectedProduct;
    if (selectedProduct === null) {
      return (<div>Loading...</div>);
    }

    if (this.state.filteredRatings.length !== 0) {
      var displayedReviews = this.state.filteredRatings;

    } else {
      var displayedReviews = this.state.displayedReviews;
    }


    return (
      <div id='rr-ratings-reviews-widget' id='rr-ratings-reviews-widget'
        onClick={this.handleInteractions}
      >
        <h3 name='rr-component-title' id='rr-component-title' className='rr-component-title'>RATINGS &amp; REVIEWS</h3>
        <div id='rr-ratings-reviews'>
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

          {this.state.reviews ?
            <ReviewsList
              selectedProduct={this.props.selectedProduct}
              averageRating={this.averageRating}
              roundedAverage={this.roundedAverage}
              characteristics={this.state.characteristics}
              loadMoreReviews={this.loadMoreReviews}
              reviews={this.state.reviews}
              displayedReviews={displayedReviews}
              sortOptions={this.sortOptions}
              handleReviewSort={this.handleReviewSort}
              getReviews={this.getReviews}
              getRatings={this.getRatings}
              currentSort={this.state.sort}
              product_id={this.state.product_id}
              count={this.state.count}
              reviewsLength={this.state.reviewsLength}
              callback={(filteredList) => this.updateReviewsList(filteredList)}
              expanded={this.state.expanded}
              expandBody={this.expandBody}
            />
            : <NewReview
              selectedProduct={selectedProduct}
              characteristics={this.characteristics}
            />}

        </div>
      </div>
    );
  }
}

export default RatingsAndReviews;