import React from 'react';
import ImageGallery from './ImageGallery';
import ProductInformation from './ProductInformation';
import StyleSelector from './StyleSelector';
import Cart from './Cart';

const ProductOverview = (props) => {
  return (
    <div>
      Product Overview
      <ImageGallery />
      <ProductInformation />
      <StyleSelector />
      <Cart />
    </div>
  );
};

export default ProductOverview;