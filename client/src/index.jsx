import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpdate.bind(this);

    this.state = {
      products: [],
      selectedProduct: null
    };
  }

  handleUpdate(urlToReload, stateKeyToUpdate) {
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

  componentDidMount() {
    this.handleUpdate('/products', 'products')
      .then(() => {
        const selectedProduct = this.state.products[0].id;
        this.setState({ selectedProduct: selectedProduct });
        console.log(selectedProduct);
      });
  }

  render() {
    const { products } = this.state;
    return (
      <div id='App'>
        <h3>Temporary Product Selector</h3>
        <select name='tempProductSelector' onChange={(e) => { this.setState({ selectedProduct: e.currentTarget.value }); }}>
          {
            products.length ? (
              products.map(product => (<option key={product.id} value={product.id}>{product.name}</option>))
            ) : (
              <p>Loading...</p>
            )
          }
        </select>
      </div>
    );
  }
}

export default App;

const div = document.createElement('div');
div.setAttribute('id', 'Atelier');
document.body.appendChild(div);
ReactDOM.render(<App />, div);
