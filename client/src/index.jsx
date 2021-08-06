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

    this.handleUpdate = this.handleUpdate.bind(this);
    this.selectProduct = this.selectProduct.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    // this.updateProductData = this.updateProductData.bind(this);
    this.checkCache = this.checkCache.bind(this);
    this.updateCache = this.updateCache.bind(this);


    this.cache = {
      imageURLs: new Map(),
      products: new Map(),
      questions: new Map(),
      ratings: new Map(),
      relatedIds: new Map(),
    };

    this.state = {
      ready: false,
      selectedProduct: null,
      // products: [],
      selectedProductRating: { ratingsCount: undefined, avgRating: undefined, ratings: [] },
      selectedProductImageURLs: [],
      selectedProductThumbnailURLs: []
    };
  }

  handleUpdate(urlToReload, stateKeyToUpdate) {
    if (this.props.isTesting) {
      return new Promise((resolve, reject) => {
        resolve();
        reject();
      });
    }

    return axios.get(urlToReload)
      .then(res => {
        this.setState({
          [stateKeyToUpdate]: res.data
        });
      })
      .catch(err => {
        console.log(err.stack);
      });
  }

  selectProduct(product) {
    console.log(`${product.name} selected`);
    this.setState({
      selectedProduct: product
    });
  }

  checkCache(cacheName, productId) {
    return this.cache[cacheName].get(productId);
  }

  updateCache(cacheName, productId, data) {
    this.cache[cacheName].set(productId, data);
  }

  // updateImageURLs(imageURLs, thumbnailURLs) {
  //   const { id } = this.state.selectedProduct;
  //   this.cache.imageURLs.set(id, { imageURLs, thumbnailURLs });
  //   this.setState({
  //     selectedProductImageURLs: imageURLs,
  //     selectedProductThumbnailURLs: thumbnailURLs
  //   });
  // }

  // updateProductCache(productList, productMap) {
  //   this.cache.products = productMap;
  //   this.setState({
  //     products: productList
  //   });
  // }

  // this.props.updateRatings(ratings.length, ratings.reduce((total, rating) => (total + rating)) / ratings.length);

  // updateSelectedProductRatings(ratings) {
  //   const { id } = this.state.selectedProduct;
  //   this.cache.ratings.set(id, {
  //     ratingsCount: ratings.length,
  //     avgRating: ratings.reduce((total, rating) => (total + rating)) / ratings.length
  //   });
  //   this.setState({
  //     rating:
  //   })
  // }

  handleSelectChange(e) {
    const { products } = this.cache;
    const productId = parseInt(e.currentTarget.value);
    const selectedProduct = products.get(productId);
    this.selectProduct(selectedProduct);
  }

  componentDidMount() {
    axios.get('/products')
      .then(res => {
        const products = res.data;
        products.forEach(product => {
          this.cache.products.set(product.id, product);
        });
        this.setState({
          products: products,
          selectedProduct: products[Math.floor(Math.random() * products.length)],
          ready: true
        });
      });
  }

  render() {
    const { products, selectedProduct, ready } = this.state;
    if (ready) {
      console.log('select product', selectedProduct.id);

    }
    //console.log('App re-render');
    let key = 0;
    return ready ? (
      <div id='app'>
        <h3>{`${selectedProduct.name} selected`}</h3>
        <select name='productSelector' value={selectedProduct.id} onChange={this.handleSelectChange}>
          {products.map(product => (<option key={`product${key++}`} value={product.id}>{product.name}</option>))}
        </select>
        <ProductOverview
          selectedProduct={selectedProduct}
          // ratings={this.store.ratings}
          isTesting={this.props.isTesting}
        />
        <RelatedProducts
          selectedProduct={selectedProduct}
          selectProduct={this.selectProduct}
          checkCache={ this.checkCache }
          updateCache={ this.updateCache }
          // products={products}
          // updateProductData={this.updateProductData}
        />
        <QA productId={selectedProduct.id} />
        <br></br>
        <RatingsAndReviews
          selectedProduct={selectedProduct} />
      </div>
    ) : (
      <p>Loading...</p>
    );
  }
}

export default App;

const div = document.createElement('div');
div.setAttribute('id', 'Atelier');
document.body.appendChild(div);
ReactDOM.render(<App />, div);
