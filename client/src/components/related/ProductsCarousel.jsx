import React from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import '../css/RelatedProducts.css';

const ProductsCarousel = (props) => {
  const { products } = props;

  return (
    <div id='RelatedProductsCarousel'>
      <h1></h1>
      <span className='componentTitle'>RELATED PRODUCTS</span>
      <div className='cardContainer'>{
        products.length ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} updateOutfit={(p) => {}} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default ProductsCarousel;