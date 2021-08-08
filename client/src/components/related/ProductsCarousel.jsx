import React from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
// import '../css/RelatedProducts.css';

const ProductsCarousel = (props) => {
  const { productIds, selectProduct, selectedProduct, checkCache, updateCache } = props;

  const handleAction = (event) => {
    event.stopPropagation();
  };

  let key = 0;

  return (
    <div id='ProductsCarousel'>
      <h1></h1>
      <span className='rp-component-title'>RELATED PRODUCTS</span>
      <div className='rp-card-container'>{
        productIds.length ? (
          productIds.map(id => (
            <ProductCard
              key={ `rpCard${key++}` }
              type='Related product'
              productId={ id }
              selectedProduct={ selectedProduct }
              selectProduct={ selectProduct }
              action={ handleAction }
              checkCache={ checkCache }
              updateCache={ updateCache }
            />
          ))
        ) : (
          <div className='rp-card rp-card-placeholder'>Searching...</div>
        )}
      </div>
    </div>
  );
};

export default ProductsCarousel;