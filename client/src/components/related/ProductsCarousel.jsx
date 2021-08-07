import React from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
// import '../css/RelatedProducts.css';

const ProductsCarousel = (props) => {
  const { products, selectProduct, selectedProduct, checkCache, updateCache } = props;

  let key = 0;

  return (
    <div id='ProductsCarousel'>
      <h1></h1>
      <span className='rp-component-title'>RELATED PRODUCTS</span>
      <div className='rp-card-container'>{
        products.length ? (
          products.map(product => {
            if (typeof product === 'number') {
              return <ProductCard key={ key++ } type='placeholder' value='Loading...' />;
            }
            return <ProductCard
              key={ `rpCard${key++}` }
              product={ product }
              selectedProduct={ selectedProduct }
              selectProduct={ selectProduct }
              action={ () => {} }
            />;
          })
        ) : (
          <div className='rp-card rp-card-placeholder'>Searching...</div>
        )}
      </div>
    </div>
  );
};

export default ProductsCarousel;