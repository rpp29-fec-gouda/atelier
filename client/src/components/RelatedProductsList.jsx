import React from 'react';
import axios from 'axios';
import RelatedProductCard from './RelatedProductCard.jsx';
import './css/RelatedProducts.css';

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);

    this.updateOutfit.bind(this);

    this.state = {
      outfit: []
    };
  }

  updateOutfit(product) {
    let newOutfit = this.state.outfit.slice();
    const productIndex = newOutfit.indexOf(product);
    if (productIndex < 0) {
      console.log(`Add "${product.name}" to outfit`);
      newOutfit = [ product, ...newOutfit ];
    } else {
      console.log(`Remove "${product.name}" from outfit`);
      newOutfit.splice(productIndex, 1);
    }

    this.setState({
      outfit: newOutfit
    });
  }

  render() {
    const { products } = this.props;
    const { outfit } = this.state;
    return (
      <div id='RelatedProducts'>
        <h1></h1>
        <span className='componentTitle'>RELATED PRODUCTS</span>
        <div className='cardContainer'>
          {products.map(product => (
            <RelatedProductCard key={product.id} product={product} updateOutfit={(p) => { this.updateOutfit(p); }} />
          ))}
        </div>
        {outfit.length ? (
          <div id='Outfit'>
            <h1></h1>
            <span className='componentTitle'>YOUR OUTFIT</span>
            <div className='cardContainer'>
              {outfit.map(product => (
                <RelatedProductCard key={product.id} product={product} updateOutfit={(p) => { this.updateOutfit(p); }} />
              ))}
            </div>
          </div>
        ) : (
          null
        )}
      </div>
    );
  }
}

export default RelatedProductsList;