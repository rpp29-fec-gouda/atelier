import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.css';
import RelatedProducts from './components/related/RelatedProducts.jsx';
import RatingsAndReviews from './components/ratingsReviews/RatingsAndReviews.jsx';
import ProductOverview from './components/overview/ProductOverview';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
    this.selectProduct = this.selectProduct.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.updateProductData = this.updateProductData.bind(this);

    this.store = {
      products: new Map(),
      questions: new Map(),
      ratings: new Map(),
      related: new Map()
    };

    this.state = {
      ready: false,
      products: [],
      selectedProduct: null
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

  updateProductData(productList, productMap) {
    this.store.products = productMap;
    this.setState({
      products: productList
    });
  }

  handleSelectChange(e) {
    const { products } = this.store;
    const productId = parseInt(e.currentTarget.value);
    const selectedProduct = products.get(productId);
    this.selectProduct(selectedProduct);
  }

  componentDidMount() {
    axios.get('/products')
      .then(res => {
        const products = res.data;
        products.forEach(product => {
          this.store.products.set(product.id, product);
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

    console.log('App re-render');
    let key = 0;
    return ready ? (
      <div id='app'>
        <h3>{`${selectedProduct.name} selected`}</h3>
        <select name='productSelector' value={ selectedProduct.id } onChange={ this.handleSelectChange }>
          { products.map(product => (<option key={`product${key++}`} value={product.id}>{product.name}</option>)) }
        </select>
        <ProductOverview
          selectedProduct={ selectedProduct }
        />
        <RelatedProducts
          products={ products }
          selectedProduct={ selectedProduct }
          updateProductData={ this.updateProductData }
          selectProduct={ this.selectProduct }
        />
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
