import React from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import '../css/RelatedProducts.css';

const ProductsCarousel = (props) => {
  const { products, selectProduct, selectedProduct } = props;
  let key = 0;

  return (
    <div id='RelatedProductsCarousel'>
      <h1></h1>
      <span className='componentTitle'>RELATED PRODUCTS</span>
      <div className='cardContainer'>{
        products.length ? (
          products.map(product => (
            <ProductCard
              key={ `related${key++}` }
              product={ product }
              selectProduct={ selectProduct }
              selectedProduct={ selectedProduct }
              updateOutfit={ (p) => {} }
              main= { props.main }
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default ProductsCarousel;