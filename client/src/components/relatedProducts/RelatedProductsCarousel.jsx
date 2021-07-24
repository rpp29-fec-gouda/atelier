import React from 'react';
import axios from 'axios';
import RelatedProductCard from './RelatedProductCard.jsx';
import '../css/RelatedProducts.css';

const RelatedProductsCarousel = (props) => {
  const { products } = props;

  return (
    <div id='RelatedProductsCarousel'>
      <h1></h1>
      <span className='componentTitle'>RELATED PRODUCTS</span>
      {/* <div className='cardContainer'>
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
      )} */}
    </div>
  );
}

export default RelatedProductsCarousel;