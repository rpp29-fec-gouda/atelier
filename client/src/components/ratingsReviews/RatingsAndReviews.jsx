import React from 'react';
import RatingList from './RatingList.jsx';
import ReviewsList from './ReviewsList.jsx';
import axios from 'axios';
import '../css/RatingsReviews.css';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ratings: [],
      reviews: [],
      characteristics: [],
      recommended: {},
      // eslint-disable-next-line camelcase
      product_id: ''
    };
  }

  getReviews() {
    return axios.get(`reviews?count=1000000&page=1&sort=relevant&product_id=${this.props.selectedProduct.id}`);
  }

  getRatings() {
    return axios.get(`reviews/meta?product_id=${this.props.selectedProduct.id}`);
  }


  componentDidMount () {
    console.log('teest', this.props.selectedProduct);
    Promise.all([this.getReviews(), this.getRatings()])
      .then(res => {
        this.setState({
          reviews: res[0].data.results,
          ratings: res[1].data.ratings,
          characteristics: res[1].data.characteristics,
          recommended: res[1].data.recommended,
          // eslint-disable-next-line camelcase
          product_id: res[0].data.product

        });

      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidUpdate() {
    Promise.all([this.getReviews(), this.getRatings()])
      .then(res => {
        if (this.state.product_id !== res[0].data.product) {
          this.setState({
            reviews: res[0].data.results,
            ratings: res[1].data.ratings,
            characteristics: res[1].data.characteristics,
            recommended: res[1].data.recommended,
            // eslint-disable-next-line camelcase
            product_id: res[0].data.product
          });
        }

      })
      .then(res => {
        console.log('STATE', this.state);
      })
      .catch(error => {
        console.error(error);
      });
  }



  render() {
    return (
      <div id='ratings-reviews'>
        <span className='component-title'>RATINGS &amp; REVIEWS</span>
        <div id='ratings'>
          <ReviewsList
            reviews={this.state.reviews}/>
          <RatingList
            ratings={this.state.ratings}
            reviews={this.state.reviews}
            characteristics={this.state.characteristics}
            recommended={this.state.recommended}/>
        </div>
      </div>
    );
  }
}

export default RatingsAndReviews;