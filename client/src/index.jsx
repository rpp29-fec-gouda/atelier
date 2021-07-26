import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.css';
import RelatedProducts from './components/related/RelatedProducts.jsx';
import RatingsAndReviews from './components/ratingsReviews/RatingsAndReviews.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
    this.selectProduct = this.selectProduct.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.updateProductMap = this.updateProductMap.bind(this);
    // this.fetchProductById.bind(this);
    // this.mapAllProductsById.bind(this);
    this.productMap = undefined;
    this.label = 'Main';

    this.state = {
      ready: false,
      products: [],
      productMap: undefined,
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

  updateProductMap(products, productMap) {
    console.log(this.label, this.state.selectedProduct.name);
    this.productMap = productMap;
    this.setState({
      products: products
    });
  }

  handleSelect(e) {
    const productId = parseInt(e.currentTarget.value);
    const selectedProduct = this.productMap.get(productId);
    this.setState({ selectedProduct: selectedProduct });
    // console.log(product);
  }

  componentDidMount() {
    axios.get('/products')
      .then(res => {
        const products = res.data;
        this.setState({
          products: products,
          selectedProduct: products[Math.floor(Math.random() * products.length)],
          ready: true
        });
        // this.mapAllProductsById();
      });
  }

  render() {
    const { products, selectedProduct, ready } = this.state;
    // const productMap = this.productMap;
    console.log('index.jsx re-render');

    return (
      ready ? (
        <div id='App'>
          <h3>{`${selectedProduct.name} selected`}</h3>
          <select name='productSelector' defaultValue={ selectedProduct.id } onChange={ this.handleSelect }>
            { products.map(product => (<option key={`product${product.id}`} value={product.id}>{product.name}</option>)) }
          </select>
          <RelatedProducts
            products={ products }
            selectedProduct={ selectedProduct }
            updateProductMap={ this.updateProductMap }
            selectProduct={ this.selectProduct }
            // fetchProductById={ (id, callback) => { this.fetchProductById(id, callback) }}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )
    );
  }
}

export default App;

const div = document.createElement('div');
div.setAttribute('id', 'Atelier');
document.body.appendChild(div);
ReactDOM.render(<App />, div);
