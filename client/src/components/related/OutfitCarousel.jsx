import React from 'react';
import axios from 'axios';
import RelatedProductCard from './ProductCard.jsx';
import '../css/RelatedProducts.css';

//
// Try to use product ids instead of products for performance reasons
//

class OutfitCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.updateOutfit = this.updateOutfit.bind(this);
    this.addToOutfit = this.addToOutfit.bind(this);

    this.state = {
      outfit: this.props.outfit
    };
  }

  updateOutfit(product) {
    let newOutfit = this.state.outfit.slice();
    const productIndex = newOutfit.indexOf(product);
    if (productIndex < 0) {
      console.log(`Added "${product.name}" to outfit`);
      newOutfit = [ product, ...newOutfit ];
    } else {
      console.log(`Removed "${product.name}" from outfit`);
      newOutfit.splice(productIndex, 1);
    }

    this.setState({
      outfit: newOutfit
    });
  }

  addToOutfit() {
    const { selectedProduct } = this.props;
    let newOutfit = this.state.outfit.slice();
    if (newOutfit.includes(selectedProduct)) {
      return;
    }
    this.setState({
      outfit: [ props.selectedProduct, ...newOutfit ]
    });
  }

  removeFromOutfit(product) {
    let newOutfit = this.state.outfit.slice();
    newOutfit.splice(newOutfit.indexOf(product), 1);
    this.setState({
      outfit: newOutfit
    });
  }

  render() {
    const { selectedProduct } = this.props;
    const { outfit } = this.state;

    return outfit.length ? (
      <div id='OutfitCarousel'>
        <h1></h1>
        <span className='componentTitle'>YOUR OUTFIT</span>
        <div className='cardContainer'>
          <div className='relatedProductCard addToOutfit' onClick={ this.addToOutfit }>
            <h1>+</h1>
            <h2>Add to Outfit</h2>
          </div>
          {
            outfit.map(product => (
              <ProductCard key={product.id} product={product} onSelect={(product) => { this.selectProduct(product); }} onRemove={(p) => { this.updateOutfit(p); }} />
            ))
          }
        </div>
      </div>
    ) : (
      <div className='relatedProductCard addToOutfit' onClick={ this.addToOutfit }>
        <h1>+</h1>
        <h2>Add to Outfit</h2>
      </div>
    );
  }
}

export default OutfitCarousel;
