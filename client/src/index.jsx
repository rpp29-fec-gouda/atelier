import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.css';

import QA from './components/QA/QA.jsx';

import RelatedProducts from './components/related/RelatedProducts.jsx';
import RatingsAndReviews from './components/ratingsReviews/RatingsAndReviews.jsx';
import ProductOverview from './components/overview/ProductOverview';
import Navbar from './components/shared/Navbar.jsx';
import DarkMode from './components/shared/DarkMode.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.selectProduct = this.selectProduct.bind(this);
    this.checkCache = this.checkCache.bind(this);
    this.updateCache = this.updateCache.bind(this);

    this.cache = {
      products: new Map(),
      questions: new Map(),
      ratings: new Map(),
      reviews: new Map(),
      relatedIds: new Map(),
      styles: new Map()
    };

    this.state = {
      ready: false,
      selectedProduct: null,
      selectedProductImageURLs: [],
      selectedProductThumbnailURLs: [],
      mode: 'light'
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
        <Navbar />
        <ProductOverview
          selectedProduct={selectedProduct}
          checkCache={ this.checkCache }
          updateCache={ this.updateCache }
          isTesting={this.props.isTesting}
        />
        <hr></hr>
        <RelatedProducts
          selectedProduct={selectedProduct}
          selectProduct={this.selectProduct}
          checkCache={this.checkCache}
          updateCache={this.updateCache}
        />
        <hr></hr>
        <QA
          selectedProduct={selectedProduct}
          checkCache={ this.checkCache}
          updateCache={ this.updateCache}
        />
        <br></br>
        <hr></hr>
        <RatingsAndReviews
          reviews={this.state.reviews}
          ratings={this.state.ratings}
          selectedProduct={selectedProduct}
          checkCache={this.checkCache}
          updateCache={this.updateCache} />
      </React.Fragment>
    ) : (
      <p>Loading...</p>
    );
  }
}

export default App;

const randomPage = Math.round(Math.random() * 900);
axios.get(`/products?page=${randomPage}&count=1`)
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
