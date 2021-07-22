import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.css';
import RelatedProductsList from './components/RelatedProductsList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpdate.bind(this);

    this.state = {
      products: [],
      related: []
    };
  }

  handleUpdate(urlToReload, stateKeyToUpdate) {
    axios.get(urlToReload)
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
    this.handleUpdate('/products', 'products');
  }

  render() {
    const { products } = this.state;
    return (
      <div id='App'>
        <h3>Behold, some data:</h3>
        <select name='productSelector' onChange={(e) => { console.log(e.currentTarget.value); }}>
          {
            products.length ? (
              products.map(product => (<option key={product.id} value={product.id}>{product.name}</option>))
            ) : (
              <p>Loading...</p>
            )
          }
        </select>
        <RelatedProductsList products={ products } />
        {/* { products prop should be supplied by this.state.relatedProducts } */}
      </div>
    );
  }
}

const div = document.createElement('div');
div.setAttribute('id', 'Atelier');
document.body.appendChild(div);
ReactDOM.render(<App />, div);
