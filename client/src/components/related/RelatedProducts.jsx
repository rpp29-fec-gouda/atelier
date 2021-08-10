import React from 'react';
import ProductsCarousel from './ProductsCarousel.jsx';
import Outfit from './Outfit.jsx';
import axios from 'axios';
import '../css/RelatedProducts.css';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);

    this.selectProduct = this.selectProduct.bind(this);
    // this.updateOutfit = this.updateOutfit.bind(this);

    this.state = {
      displayPhotos: false,
      selectedProductId: this.props.selectedProduct.id,
      related: [],
      ready: true
    };
  }

  collectRelatedProducts(product) {
    this.fetchRelatedIds(product, (ids) => {
      this.collectProductsById(ids);
    });
  }

  fetchRelatedIds(product, callback = () => {}) {
    const id = product.id;
    const { checkCache, updateCache } = this.props;
    let ids = checkCache('relatedIds', id);

    if (ids) {
      console.log(`${ids.length} products associated with ${product.name}:`, ids);
      callback(ids);
    } else {
      axios.get(`/products/${id}/related`)
        .then(res => {
          ids = Array.from(new Set(res.data));
          console.log(`${ids.length} product ids associated with ${product.name}`, ids);
          updateCache('relatedIds', id, ids);
          callback(ids);
        })
        .catch(err => {
          console.log(err.stack);
        });
    }
  }

  // updateOutfit(newOutfit) {
  //   this.setState({ outfit: newOutfit });
  // }

  selectProduct(productId) {
    this.props.selectProduct(productId);
    this.setState({ ready: false });
  }

  componentDidMount() {
    // this.loadOutfit();
    this.fetchRelatedIds(this.props.selectedProduct, (ids) => {
      this.setState({
        related: ids
      });
    });
  }

  componentDidUpdate() {
    const { selectedProduct } = this.props;
    if (this.state.selectedProductId !== selectedProduct.id) {
      this.setState({ selectedProductId: selectedProduct.id });
      this.fetchRelatedIds(selectedProduct, (ids) => {
        this.setState({
          related: ids
        });
      });
    }
  }

  render() {
    const { related, outfit } = this.state;
    const { selectedProduct, selectProduct, checkCache, updateCache } = this.props;

    return (
      <div id='RelatedProducts'>
        <ProductsCarousel
          productIds={ related }
          selectedProduct={ selectedProduct }
          selectProduct={ selectProduct }
          checkCache={ checkCache }
          updateCache={ updateCache }
        />
        <Outfit
          // productIds={ outfit }
          // updateOutfit={ this.updateOutfit }
          selectedProduct={ selectedProduct }
          selectProduct={ selectProduct }
          checkCache={ checkCache }
          updateCache={ updateCache }
        />
      </div>
    );
  }
}


export default RelatedProducts;