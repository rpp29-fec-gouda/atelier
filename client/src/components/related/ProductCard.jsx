import React from 'react';
// import '../css/RelatedProducts.css';

const stars = [1, 1, 1, .8, 0];

const ProductCard = (props) => {
  if (!props.product) {
    return null;
  }
  const { product, selectedProduct, selectProduct, type, action, value } = props;
  let hoverText, actionClass, actionSymbol;

  const handleActionButtonClick = (event) => {
    event.stopPropagation();
    action(product);
  };

  const handleProductClick = () => {
    selectProduct(product);
  };

  if (type !== 'placeholder') {
    if (type === 'outfit') {
      hoverText = `Remove ${product.name} from outfit`;
      actionClass = 'remove-from-outfit-symbol';
      actionSymbol = '+';
    } else {
      hoverText = `Compare ${selectedProduct.name} with ${product.name}`;
      actionClass = 'rp-compare-symbol';
      actionSymbol = String.fromCharCode(9734);
    }
  }

  const maxTitleTextLength = 60;
  // console.log(`Rendering card for ${product.name}`);
  let trimmedTitle = `${product.name}: ${product.slogan.toLowerCase()}`;
  if (trimmedTitle.length > maxTitleTextLength) {
    const endIndex = Math.min(trimmedTitle.indexOf('.'), trimmedTitle.indexOf(' ', maxTitleTextLength - 10));
    trimmedTitle = trimmedTitle.slice(0, endIndex) + '...';
  }

  let key = 0;
  return type === 'placeholder' ? (
    <div className='rp-card rp-card-placeholder' >{value}</div>
  ) : (
    <div className='rp-card' title={`Select ${product.name}`} onClick={ handleProductClick }>
      <div className='rp-image-backer'>
        <img src=''></img>
        <div className={actionClass} title={hoverText} value={product.id} onClick={ handleActionButtonClick } >{actionSymbol}</div>
      </div>
      <div className='rp-info'>
        <span className='rp-category'>{product.category.toUpperCase()}</span>
        <span className='rp-title'>{trimmedTitle}</span>
        <span className='rp-price' title={`Default price: ${product.default_price}`}>{'$' + product.default_price}</span>
        <div className='rp-star-rating' title='Average customer review: 3.8 out of 5'>
          {stars.map(star => (
            <a key={key++}>{String.fromCharCode((star > 0) ? 9733 : 9734)}</a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;