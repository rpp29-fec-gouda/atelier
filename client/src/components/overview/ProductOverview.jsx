import React from 'react';
import ImageGallery from './ImageGallery';
import ProductInformation from './ProductInformation';
import StyleSelector from './StyleSelector';
import Cart from './Cart';
import ProductDescription from './ProductDescription';
import './productOverview.css';

const ProductOverview = (props) => {
  const { id, name, category, slogan, description } = props.selectedProduct;
  return (
    <div id="product-overview">
      <div class="row">
        <ImageGallery
          id={ id }
        />
        <div id="product-col-right" class="column">
          <ProductInformation
            id={ id }
            name={ name }
            category={ category }
            defaultPrice={ props.selectedProduct.default_price }
            slogan={ slogan }
            description={ description }
          />
          <StyleSelector
            id={ id }
          />
          <Cart
            id={ id }
          />
        </div>
      </div>
      {
        slogan && description &&
        <ProductDescription
          slogan={ slogan }
          description={ description }
        />
      }
    </div>
  );
};

export default ProductOverview;