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

    this.productList = this.props.products;

    this.store = {
      products: new Map(),
      related: new Map()
    };

    this.state = {
      related: [],
      outfit: [],
      asyncLoading: true
    };
  }

  collectRelatedProducts(product) {
    // console.log('reset related products');
    this.fetchRelatedIds(product, (ids) => {
      this.collectProductsById(ids);
    });
  }

  fetchRelatedIds(product, callback = () => {}) {
    const id = product.id;
    const { related } = this.store;
    let ids = related.get(product.id);

    if (ids) {
      // console.log(`${ids.length} products associated with ${product.name}:`, ids);
      callback(ids);
    } else {
      axios.get(`/products/${id}/related`)
        .then(res => {
          ids = res.data;
          // console.log(`${ids.length} product ids associated with ${product.name}`, ids);
          related.set(id, ids);
          callback(ids);
          // this.setState({ related: res.data });
        })
        .catch(err => {
          console.log(err.stack);
        });
    }
  }

  collectProductsById(ids) {
    // Update to choose between cached data or API call on a per-product basis
    const { products } = this.store;
    let toLoad = [];
    let loaded = [];

    ids.forEach(id => {
      let product = products.get(id);
      if (product) {
        loaded.push(product);
      } else {
        toLoad.push(id);
      }
    });

    this.setState({
      related: [...loaded]
    });

    if (toLoad.length) {
      toLoad.forEach(id => {
        axios.get(`/products/${id}`)
          .then(res => {
            const product = res.data;
            const relatedProducts = this.state.related.slice();
            // console.log(`Related product ${product.name} retrieved`);
            this.productList.push(product);
            products.set(id, product);
            this.setState({
              related: [product, ...relatedProducts]
            });
          })
          .catch(err => {
            console.log(err.stack);
          });
      });
    }
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
    const outfitIds = localStorage.getItem('outfit');
    console.log('Outfit Ids from localStorage:', outfitIds);

    if (outfitIds) {
      const { products } = this.store;
      let loaded = [];
      let index = 0;

      JSON.parse(outfitIds).forEach(id => {
        let product = products.get(id);

        if (product) {
          loaded[index++] = product;
          // console.log(`${product.name} already loaded`);
          this.setState({ products: [...loaded] });
        } else {
          let asyncIndex = index++;
          axios.get(`/products/${id}`)
            .then(res => {
              const product = res.data;
              loaded[asyncIndex] = product;
              // console.log(`${product.name} loaded from server/API`);
              this.setState({ products: [...loaded] });
            })
            .catch(err => {
              console.log('Loading outfit:', err.stack);
            });
        }
      });
    }
  }

  updateOutfit(newOutfit) {
    // console.log('Related products updating outfit:', newOutfit);
    this.setState({ outfit: newOutfit });
  }

  // mapAllProductsById() {
  //   return axios.get('/products?count=1000000')
  //     .then(res => {
  //       const { products: map } = this.store;
  //       const allProducts = res.data;
  //       for (let i = 0, end = allProducts.length; i < end; i++) {
  //         const product = allProducts[i];
  //         map.set(product.id, product);
  //       }
  //       this.products = allProducts;
  //     })
  //     .catch(err => {
  //       console.log(err.stack);
  //     });
  // }

  selectProduct(product) {
    const { updateProductData, selectProduct } = this.props;
    updateProductData(this.productList, this.store.products);
    // this.collectRelatedProducts(product);
    this.props.selectProduct(product);
  }

  componentDidMount() {
    // In the future this will also need to identify the user and bring up their selected outfit from their past session
    // this.mapAllProductsById()
    //   .then(() => {
    //     this.props.updateProductData(this.products, this.store.products);
    //     this.collectRelatedProducts(this.props.selectedProduct);
    //   })
    //   .catch(err => {
    //     console.log(err.stack);
    //   });
    this.loadOutfit();
    this.collectRelatedProducts(this.props.selectedProduct);
  }

  componentDidUpdate() {
    const relatedProductIds = this.store.related.get(this.props.selectedProduct.id);
    if (relatedProductIds) {
      // this.collectProductsById(relatedProductIds);
    } else {
      this.collectRelatedProducts(this.props.selectedProduct);
    }
  }

  render() {
    const { related, outfit } = this.state;
    const { selectedProduct, selectProduct } = this.props;

    // console.log('Related products:', related);

    // console.log('RelatedProducts re-render');
    return (
      <div id='RelatedProdcuts'>
        <ProductsCarousel
          // key={ selectedProduct }
          products={ related }
          selectedProduct={ selectedProduct }
          selectProduct={ this.selectProduct }
        />
        <Outfit
          products={ outfit }
          updateOutfit={ this.updateOutfit }
          selectedProduct={ selectedProduct }
          selectProduct={ this.selectProduct }
        />
        {/* <RelatedProductsOutfit /> */}
      </div>
    );
  }
}


export default RelatedProducts;