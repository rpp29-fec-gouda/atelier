import React from 'react';
import ProductCard from './ProductCard.jsx';
// import localStorage from '../../helpers/localStorage.js';
import axios from 'axios';
import '../css/RelatedProducts.css';

//
// Try to use product ids instead of products for performance reasons
//

class Outfit extends React.Component {
  constructor(props) {
    super(props);

    this.updateOutfit = this.updateOutfit.bind(this);
    this.addToOutfit = this.addToOutfit.bind(this);
    this.removeFromOutfit = this.removeFromOutfit.bind(this);

    this.store = {
      products: new Map()
    };

    this.state = {
      outfit: []
    };
  }

  updateOutfit(newOutfit) {
    const { localStorage } = window;
    if (newOutfit.length) {
      localStorage.setItem('outfit', JSON.stringify(newOutfit.map(item => item.id)));
    } else {
      localStorage.removeItem('outfit');
    }

    this.setState({
      outfit: newOutfit
    });
  }

  addToOutfit() {
    const { selectedProduct } = this.props;
    let oldOutfit = this.state.outfit.slice();

    if (oldOutfit.includes(selectedProduct)) {
      return;
    }

    this.updateOutfit([ selectedProduct, ...oldOutfit ]);
  }

  removeFromOutfit(product) {
    let oldOutfit = this.state.outfit.slice();
    const newOutfit = oldOutfit.splice(oldOutfit.indexOf(product), 1);
    this.updateOutfit(newOutfit);
  }

  loadOutfit() {
    const { localStorage } = window;
    const outfitIds = localStorage.getItem('outfit');
    console.log(outfitIds);

    if (outfitIds) {
      const { products } = this.store;
      let loaded = [], index = 0;
      JSON.parse(outfitIds).forEach(id => {
        let product = products.get(id);

        if (product) {
          loaded[index++] = product;
          console.log(loaded);
          this.setState({ outfit: [...loaded] });
        } else {
          let asyncIndex = index++;
          axios.get(`/products/${id}`)
            .then(res => {
              const product = res.data;
              loaded[asyncIndex] = product;
              console.log(loaded);
              this.setState({ outfit: [...loaded]});
            })
            .catch(err => {
              console.log('Loading outfit:', err.stack);
            });
        }
      });
    }
  }

  componentDidMount() {
    this.loadOutfit();
  }

  render() {
    const { selectedProduct, selectProduct } = this.props;
    const { outfit } = this.state;

    return selectedProduct ? (
      <div id='OutfitCarousel'>
        <h1></h1>
        <span className='componentTitle'>YOUR OUTFIT</span>
        <div className='cardContainer'>
          <div className='relatedProductCard addToOutfit' title={`Add ${selectedProduct.name} to outfit`} onClick={ this.addToOutfit }>
            <h1>+</h1>
            <h2>Add to Outfit</h2>
          </div>
          {outfit.length ? (
            outfit.map(product => (
              <ProductCard key={product.id} type='outfit' product={product} selectProduct={ selectProduct } action={ this.removeFromOutfit } />
            ))) : null
          }
        </div>
      </div>
    ) : null;
  }
}

export default Outfit;
