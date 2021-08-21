import React from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
// import '../css/RelatedProducts.css';

class ProductsCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.handleNav = this.handleNav.bind(this);
    this.handleAction = this.handleAction.bind(this);

    this.navRef = React.createRef();
  }

  handleNav(direction) {
    if (direction === 'right') {
      this.navRef ? (this.navRef.current.scrollRight += 200) : null;
    } else {
      this.navRef ? (this.navRef.current.scrollRight -= 200) : null;
    }
  }

  handleAction(productId) {
    this.props.compare(productId);
  }

  render() {
    const { productIds, selectProduct, selectedProduct, checkCache, updateCache } = this.props;

    let key = 0;
    return (
      <div id='ProductsCarousel'>
        <h1></h1>
        <span className='rp-component-title'>RELATED PRODUCTS</span>
        <div className='rp-card-container'>
          <div className='rp-nav-left rp-card-sticky' onClick={() => this.handleNav('left')}>{String.fromCharCode(12296)}</div>
          {
            productIds.length ? (
              productIds.map(id => (
                <ProductCard
                  key={ `rpCard${id}` }
                  type='Related'
                  productId={ id }
                  selectedProduct={ selectedProduct }
                  selectProduct={ selectProduct }
                  action={ this.handleAction }
                  checkCache={ checkCache }
                  updateCache={ updateCache }
                />
              ))
            ) : (
              <div className='rp-card rp-card-placeholder'>Searching...</div>
            )}
          <div className='rp-nav-right rp-card-sticky'onClick={() => this.handleNav('right')}>{String.fromCharCode(12297)}</div>
        </div>
      </div>
    );
  }
}

export default ProductsCarousel;