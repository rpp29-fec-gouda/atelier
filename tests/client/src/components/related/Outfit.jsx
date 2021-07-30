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
      products: this.props.products
    };
  }

  updateOutfit(newOutfit) {
    const { localStorage } = window;
    localStorage.setItem('outfit', JSON.stringify(newOutfit.map(item => item.id)));

    this.setState({
      products: newOutfit
    });

    // this.props.updateOutfit(newOutfit);
  }

  addToOutfit(e) {
    // e.stopPropagation();
    const { selectedProduct } = this.props;
    let oldOutfit = this.state.products.slice();

    if (oldOutfit.includes(selectedProduct)) {
      return;
    }

    this.updateOutfit([ selectedProduct, ...oldOutfit ]);
  }

  removeFromOutfit(product) {
    console.log('product to remove:', product.id);
    let outfit = this.state.products.slice();
    let match = product.id;
    let i = outfit.length;
    while (i--) {
      if (outfit[i].id === match) {
        outfit.splice(i, 1);
      }
    }
    this.updateOutfit(outfit);
  }
  // componentDidMount() {
  //   this.loadOutfit();
  // }

  render() {
    const { selectedProduct, selectProduct } = this.props;
    const { products } = this.state;
    console.log('Products in current outfit:', products);

    let key = 0;
    return selectedProduct ? (
      <div id='OutfitCarousel'>
        <h1></h1>
        <span className='componentTitle'>YOUR OUTFIT</span>
        <div className='cardContainer'>
          <div className='relatedProductCard addToOutfit' title={`Add ${selectedProduct.name} to outfit`} onClick={ this.addToOutfit }>
            <h1>+</h1>
            <h2>Add to Outfit</h2>
          </div>
          {products.length ? (
            products.map(product => (
              <ProductCard key={ key++ } type='outfit' product={ product } selectProduct={ selectProduct } action={ this.removeFromOutfit } />
            ))) : null
          }
        </div>
      </div>
    ) : null;
  }
}

export default Outfit;
