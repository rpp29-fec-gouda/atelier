import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.css';
import RelatedProducts from './components/related/RelatedProducts.jsx';
import RatingsAndReviews from './components/ratingsReviews/RatingsAndReviews.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpdate.bind(this);

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
    this.setState({
      selectedProduct: product
    });
  }

  componentDidMount() {
    this.handleUpdate('/products', 'products')
      .then(() => {
<<<<<<< HEAD
        this.selectProduct(this.state.products[0]);
=======
        const initialProductId = this.state.products[0]?.id;
>>>>>>> 9ad52647eeba71387bb3324365316a8eb50d05e1
        this.setState({
          ready: true
        });
      });
  }

  render() {
    const { products, ready } = this.state;
    return (
      ready ? (
        <div id='App'>
          <h3>Temporary Product Selector</h3>
          <select name='productSelector' onChange={(e) => { this.setState({ selectedProduct: e.currentTarget.value }); }}>
            { products.map(product => (<option key={product.id} value={product}>{product.name}</option>)) }
          </select>
          <RelatedProducts selectedProduct={ this.state.selectedProduct } selectProduct={ this.selectProduct } />
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
