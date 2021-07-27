import React from 'react';
import axios from 'axios';
import RelatedProductCard from './ProductCard.jsx';
import '../css/RelatedProducts.css';

class OutfitCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.updateOutfit.bind(this);

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

  render() {
    const { selectedProduct } = this.props;
    const { outfit } = this.state;

    return outfit.length ? (
      <div id='OutfitCarousel'>
        <h1></h1>
        <span className='componentTitle'>YOUR OUTFIT</span>
        <div className='cardContainer'>{
            outfit.map(product => (
              <ProductCard key={product.id} product={product} onSelect={(p) => { this.selectProduct(p); }} onRemove={(p) => { this.updateOutfit(p); }} />
            ))}
        </div>
      </div>
    ) : null;
  }
}

export default OutfitCarousel;
