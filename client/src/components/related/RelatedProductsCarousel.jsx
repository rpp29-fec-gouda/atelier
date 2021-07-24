import React from 'react';
import axios from 'axios';
import RelatedProductCard from './ProductCard.jsx';
import '../css/RelatedProducts.css';

const RelatedProductsCarousel = (props) => {
  const { products } = props;

  return (
    <div id='RelatedProductsCarousel'>
      <h1></h1>
      <span className='componentTitle'>RELATED PRODUCTS</span>
      <div className='cardContainer'>{
        products.length ? (
          products.map(product => (
            <RelatedProductCard key={product.id} product={product} updateOutfit={(p) => {}} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default RelatedProductsCarousel;