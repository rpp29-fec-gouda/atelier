import React from 'react';
import ProductsCarousel from './ProductsCarousel.jsx';
import Outfit from './Outfit.jsx';
// import localStorage from '../../helpers/localStorage.js';
import axios from 'axios';
import '../css/RelatedProducts.css';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);

    this.selectProduct = this.selectProduct.bind(this);
    this.updateOutfit = this.updateOutfit.bind(this);

    this.state = {
      selected: this.props.selectedProduct.id,
      related: [],
      outfit: [],
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
      // console.log(`${ids.length} products associated with ${product.name}:`, ids);
      callback(ids);
    } else {
      axios.get(`/products/${id}/related`)
        .then(res => {
          ids = res.data;
          // console.log(`${ids.length} product ids associated with ${product.name}`, ids);
          updateCache('relatedIds', id, ids);
          callback(ids);
        })
        .catch(err => {
          console.log(err.stack);
        });
    }
  }

  collectProductsById(ids) {
    // Choose between cached data or API call on a per-product basis
    const { checkCache, updateCache } = this.props;
    const uniqueIds = Array.from(new Set(ids));

    let cached = [];
    let toLoad = [];

    uniqueIds.forEach(id => {
      let product = checkCache('products', id);
      if (product) {
        // console.log(`Related product ${product.id} (${product.name}) loaded from cache`);
        cached.push(product);
      } else {
        cached.push(id);
        toLoad.push(id);
      }
    });

    this.setState({
      related: [...cached]
    });

    console.log('Products to be retrieved from server:', toLoad);

    if (toLoad.length) {
      toLoad.forEach(id => {
        axios.get(`/products/${id}`)
          .then(res => {
            const product = res.data;
            const relatedProducts = [ ...this.state.related ];
            // console.log(`Related product ${product.id} (${product.name}) retrieved from server`);
            updateCache('products', id, product);
            this.setState({
              related: [ ...relatedProducts, product ]
            });
          })
          .catch(err => {
            console.log(err.stack);
          });
      });
    }

    ///////////////////////////////////////////////////////////////////////////////////////////
    // Something like the following could be used if we decide to limit client HTTP requests //
    ///////////////////////////////////////////////////////////////////////////////////////////
    //   return axios.get(`/multipleProducts?ids=${load.join('&ids=')}`)
    //     .then(res => {
    //       console.log(res.data);
    //       if (loaded.length) {
    //         loaded.concat(res.data);
    //       } else {
    //         loaded = res.data;
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err.stack);
    //     });
    // } else {
    //   if (loaded.length) {
    //     return Promise.resolve(loaded);
    //   } else {
    //     return Promise.reject('No product data');
    //   }
    // }
  }

  loadOutfit() {
    const { localStorage } = window;
    const outfitData = localStorage.getItem('outfit');

    if (outfitData) {
      const outfit = JSON.parse(outfitData);
      // console.log('Outfit found in localStorage:', outfit);
      const { checkCache, updateCache } = this.props;
      let cached = [];
      let index = 0;

      outfit.forEach(id => {
        let product = checkCache('products', id);

        if (product) {
          cached[index++] = product;
          // console.log(`Outfit product ${product.id} (${product.name}) loaded from cache`);
          this.setState({ outfit: [ ...cached ] });
        } else {
          const asyncIndex = index++;
          axios.get(`/products/${id}`)
            .then(res => {
              const product = res.data;
              cached[asyncIndex] = product;
              // console.log(`Outfit product ${product.id} (${product.name}) retrived from server`);
              this.setState({ outfit: [ ...cached ] });
              updateCache('products', product.id, product);
            })
            .catch(err => {
              console.log('Loading outfit:', err.stack);
            });
        }
      });
    }
  }

  updateOutfit(newOutfit) {
    this.setState({ outfit: newOutfit });
  }

  selectProduct(product) {
    this.props.selectProduct(product);
    this.setState({ ready: false });
  }

  componentDidMount() {
    this.loadOutfit();
    this.collectRelatedProducts(this.props.selectedProduct);
  }

  componentDidUpdate() {
    const { selectedProduct } = this.props;
    if (this.state.selected !== selectedProduct.id) {
      this.setState({ selected: selectedProduct.id });
      this.collectRelatedProducts(selectedProduct);
    }
  }

  render() {
    const { related, outfit } = this.state;
    const { selectedProduct, selectProduct, checkCache, updateCache } = this.props;

    return (
      <div id='RelatedProdcuts'>
        <ProductsCarousel
          products={ related }
          selectedProduct={ selectedProduct }
          selectProduct={ this.selectProduct }
          checkCache={ checkCache }
          updateCache={ updateCache }
        />
        <Outfit
          outfit={ outfit }
          updateOutfit={ this.updateOutfit }
          selectedProduct={ selectedProduct }
          selectProduct={ this.selectProduct }
          checkCache={ checkCache }
          updateCache={ updateCache }
        />
      </div>
    );
  }
}


export default RelatedProducts;