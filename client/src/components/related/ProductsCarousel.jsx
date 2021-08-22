import React from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
// import '../css/RelatedProducts.css';

class ProductsCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.containerElement = React.createRef();

    this.state = {
      containerLeftOffset: 0,
      showLeftNav: false,
      showRighttNav: false
    }
  }

  handleScroll(event) {
    const { containerLeftOffset } = this.state;
    console.log(Object.keys(this.containerElement));
  }

  render() {
    const { productIds, selectProduct, selectedProduct, compare, checkCache, updateCache } = this.props;
    const { containerLeftOffset, showLeftNav, showRightNav } = this.state;

    const handleAction = (productId) => {
      compare(productId);
    };

    let key = 0;
    return (
      <div id='ProductsCarousel'>
        <span className='rp-component-title'>RELATED PRODUCTS</span>
        <div className='rp-carousel-viewport'>
          <div className='rp-carousel-nav-left'></div>
          <div className='rp-card-container' style={{left: containerLeftOffset}} ref={this.containerElement} >{
            Array.isArray(productIds) && productIds.length ? (
              productIds.map(id => (
                <ProductCard
                  key={ `rpCard${id}` }
                  type='Related'
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
          <div className='rp-carousel-nav-right'></div>
        </div>
      </div>
    );
  }
};

export default ProductsCarousel;