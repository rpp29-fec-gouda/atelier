import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.css';

import QA from './components/QA/QA.jsx';

import RelatedProducts from './components/related/RelatedProducts.jsx';
import RatingsAndReviews from './components/ratingsReviews/RatingsAndReviews.jsx';
import ProductOverview from './components/overview/ProductOverview';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.selectProduct = this.selectProduct.bind(this);
    this.checkCache = this.checkCache.bind(this);
    this.updateCache = this.updateCache.bind(this);
    this.updateReviews = this.updateReviews.bind(this);
    this.updateRatings = this.updateRatings.bind(this);


    this.cache = {
      imageURLs: new Map(),
      products: new Map(),
      questions: new Map(),
      ratings: new Map(),
      relatedIds: new Map(),
      styles: new Map(),
    };

    this.state = {
      ready: false,
      selectedProduct: null,
      selectedProductRating: { ratingsCount: undefined, avgRating: undefined, ratings: [] },
      selectedProductReviews: [],
      selectedProductImageURLs: [],
      selectedProductThumbnailURLs: []
    };
  }

  selectProduct(product) {
    if (this.state.selectedProduct.id !== product.id) {
      // const product = this.checkCache('products', productId);
      if (product) {
        console.log(`${product.name} selected`);
        this.setState({
          selectedProduct: product
        });
      }
    }
  }

  checkCache(cacheName, productId) {
    return this.cache[cacheName].get(productId);
  }

  updateCache(cacheName, productId, data) {
    this.cache[cacheName].set(productId, data);
  }

  updateReviews(reviews) {
    this.setState({
      selectedProductReviews: reviews,
    }, () => {
      console.log('Reviews State: ', this.state.selectedProductReviews);
    });
  }

  updateRatings(ratings, characteristics, recommended, averageRating, totalRating) {
    this.setState({
      selectedProductRating: { ratingsCount: totalRating, avgRating: averageRating, ratings: ratings },
    }, () => (
      console.log('Ratings State: ', this.state.selectedProductRating)
    ));
  }

  componentDidMount() {
    axios.get(`/products/${this.props.init.id}`)
      .then(res => {
        const product = res.data;
        console.log(product);
        this.cache.products.set(product.id, product);
        this.setState({
          selectedProduct: product,
          ready: true
        });
      });
  }

  render() {
    const { products, selectedProduct, ready } = this.state;

    return ready ? (
      <React.Fragment>
        <ProductOverview
          selectedProduct={selectedProduct}
          isTesting={this.props.isTesting}
        />
        <RelatedProducts
          selectedProduct={selectedProduct}
          selectProduct={this.selectProduct}
          checkCache={ this.checkCache }
          updateCache={ this.updateCache }
        />
        <QA selectedProduct={selectedProduct} />
        <br></br>
        <RatingsAndReviews
          reviews={this.state.reviews}
          ratings={this.state.ratings}
          selectedProduct={selectedProduct}
          updateReviews={this.updateReviews}
          updateRatings={this.updateRatings} />
      </React.Fragment>
    ) : (
      <p>Loading...</p>
    );
  }
}

export default App;

axios.get('/products?page=1&count=1')
  .then(res => {
    const product = res.data[0];
    // this.cache.products.set(product.id, product);
    const div = document.createElement('div');
    div.setAttribute('id', 'App');
    document.body.appendChild(div);
    ReactDOM.render(<App init={product} />, div);
  })
  .catch(err => {
    console.log(err.stack);
  });
