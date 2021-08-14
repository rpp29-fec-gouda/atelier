import React from 'react';
import ProductsCarousel from './ProductsCarousel.jsx';
import Outfit from './Outfit.jsx';
import axios from 'axios';
import '../css/RelatedProducts.css';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);

    this.update = false;

    this.selectProduct = this.selectProduct.bind(this);
    // this.updateOutfit = this.updateOutfit.bind(this);

    this.state = {
      selectedId: null,
      related: [],
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

  selectProduct(product) {
    this.props.selectProduct(product);
    this.update = true;
  }

  componentDidMount() {
    // this.loadOutfit();
    this.fetchRelatedIds(this.props.selectedProduct, (ids) => {
      this.setState({
        selectedId: this.props.selectedProduct.id,
        related: ids
      });
    });
  }

  componentDidUpdate() {
    const { selectedProduct } = this.props;
    const matchId = selectedProduct.id;
    if (this.state.selectedId !== matchId) {
      this.setState({ selectedId: matchId });
      // console.log(matchId, this.state.selectedId);
      // this.update = false;
      console.log(this.state.selectedId, matchId);
      this.fetchRelatedIds(selectedProduct, (ids) => {
        this.setState({ related: ids });
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