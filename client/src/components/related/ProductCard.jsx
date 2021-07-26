import React from 'react';
import '../css/RelatedProducts.css';

const stars = [1, 1, 1, .8, 0];

const ProductCard = (props) => {
  const { product, selectedProduct, selectProduct } = props;
  const maxTitleLength = 60;
  let trimmedTitle = `${product.name}: ${product.slogan.toLowerCase()}`;
  if (trimmedTitle.length > maxTitleLength) {
    trimmedTitle = trimmedTitle.slice(0, trimmedTitle.indexOf(' ', maxTitleLength - 10)) + '...';
  }
  let key = 0;
  return (
    <div className='relatedProductCard' title={`Select ${product.name}`} onClick={(e) => { selectProduct(product); }}>
      <div className='imageBacker'>
        <img src=''></img>
        <a className='compareProductStar' title={`Compare ${product.name} with ${selectedProduct.name}`} onClick={() => { props.compare(product) }}>{String.fromCharCode(9734)}</a>
      </div>
      <div className='relatedProductInfo'>
        <span className='relatedProductCategory'>{product.category.toUpperCase()}</span>
        <span className='relatedProductTitle'>{trimmedTitle}</span>
        <span className='relatedProductPrice' title={`Default price: ${product.default_price}`}>{'$' + product.default_price}</span>
        <div className='starRating' title='Average customer review: 3.8 out of 5'>
          {stars.map(star => (
            <a key={key++}>{String.fromCharCode((star > 0) ? 9733 : 9734)}</a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;