import React from 'react';
import axios from 'axios';

const stars = [1, 1, 1, .8, 0];

class ProductCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleActionButtonClick = this.handleActionButtonClick.bind(this);
    this.handleProductClick = this.handleProductClick.bind(this);

    this.state = {
      product: undefined,
      productImageURL: '',
      alternateImageURLs: []
    };
  }

  handleActionButtonClick(event) {
    event.stopPropagation();
    const { productId, action } = this.props;
    action(productId);
  }

  handleProductClick(event) {
    this.props.selectProduct(this.state.product);
  }

  loadProductData() {
    const { productId, type, checkCache, updateCache } = this.props;
    if (productId) {
      let product = checkCache('products', productId);
      if (product) {
        console.log(`${type} product ${product.id} (${product.name}) loaded from cache`);
        this.setState({
          product: product
        });
      } else {
        axios.get(`/products/${productId}`)
          .then(res => {
            product = res.data;
            updateCache('products', productId, product);
            console.log(`${type} product ${product.id} (${product.name}) retrieved from server`);
            this.setState({
              product: product
            });
          })
          .catch(err => {
            console.log(err.stack);
          });
      }
    }
  }

  loadImages() {
    const { productId, checkCache, updateCache } = this.props;
    const product = this.state.product;
    if (productId) {
      let url = '';
      let productStyles = checkCache('styles', productId);

      if (productStyles) {
        url = productStyles.results[0].photos[0].thumbnail_url;
        console.log(`${productId} image URL loaded from cache`);
        this.setState({
          productImageURL: url
        });
      } else {
        axios.get(`/products/${productId}/styles`)
          .then(res => {
            updateCache('styles', productId, res.data);
            url = res.data.results[0].photos[0].thumbnail_url;
            // console.log(res.data.results[0].photos);

            console.log(`${productId} image URL retrieved from server`);
            this.setState({
              productImageURL: url || ''
            });
          })
          .catch(err => {
            console.log(err.stack);
          });
      }
    }
  }

  // componentDidUpdate() {
  //   const { productId } = this.props;
  //   const { product, productImageURL } = this.state;

  //   if (product && productImageURL === '') {
  //     this.loadImages();
  //   }
  // }

  componentDidMount() {
    this.loadProductData();
    this.loadImages();
  }

  render() {
    const { product } = this.state;

    if (!product) {
      return <div className='rp-card rp-card-placeholder' >Loading...</div>;
    }

    console.log(`Rendering ${product.name} product card`);

    const { checkCache, updateCache, productId, selectedProduct, selectProduct, type, action } = this.props;
    let hoverText, actionClass, actionSymbol;


    if (type === 'Outfit') {
      hoverText = `Remove ${product.name} from outfit`;
      actionClass = 'remove-from-outfit-symbol';
      actionSymbol = '+';
    } else {
      hoverText = `Compare ${selectedProduct.name} with ${product.name}`;
      actionClass = 'rp-compare-symbol';
      actionSymbol = String.fromCharCode(9733);
    }

    const maxTitleTextLength = 60;
    let trimmedTitle = `${product.name}: ${product.slogan.toLowerCase()}`;
    if (trimmedTitle.length > maxTitleTextLength) {
      const endIndex = Math.min(trimmedTitle.indexOf('.'), trimmedTitle.indexOf(' ', maxTitleTextLength - 10));
      trimmedTitle = trimmedTitle.slice(0, endIndex) + '...';
    }

    let key = 0;
    return (
      <div className='rp-card' title={`Select ${product.name}`} onClick={ this.handleProductClick }>
        <div className='rp-image-backer'>
          <img src={this.state.productImageURL}></img>
          <div className={actionClass} title={hoverText} value={productId} onClick={ this.handleActionButtonClick } >{actionSymbol}</div>
        </div>
        <div className='rp-info'>
          <span className='rp-category'>{product.category.toUpperCase()}</span>
          <span className='rp-title'>{trimmedTitle}</span>
          <span className='rp-price' title={`Default price: ${product.default_price}`}>{'$' + product.default_price}</span>
          <div className='rp-star-rating' title='Average customer review: 3.8 out of 5'>
            {stars.map(star => (
              <a key={`starRating${key++}`}>{String.fromCharCode((star > 0) ? 9733 : 9734)}</a>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;