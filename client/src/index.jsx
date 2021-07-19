import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpdate.bind(this);

    this.state = {
      products: []
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
        {
          products.length ? (
            products.map(product => (<div key={product.id}>{product.name}</div>))
          ) : (
            <p>Loading...</p>
          )
        }
      </div>
    );
  }
}

const div = document.createElement('div');
div.setAttribute('id', 'Atelier');
document.body.appendChild(div);
ReactDOM.render(<App />, div);
