import React from 'react';
import ProductsCarousel from './ProductsCarousel.jsx';
import OutfitCarousel from './OutfitCarousel.jsx';
import axios from 'axios';
import '../css/RelatedProducts.css';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);

    this.selectProduct = this.selectProduct.bind(this);

    this.products = [];

    this.store = {
      products: new Map(),
      related: new Map()
      // outfit: undefined
    };

    this.state = {
      related: [],
      outfit: []
    };
  }

  collectRelatedProducts(product) {
    console.log('reset related products');
    this.fetchRelatedIds(product, (ids) => {
      this.collectProductsById(ids)
        .then(res => {
          this.setState({
            related: res.data
          });
        })
        .catch(err => {
          console.log(err.stack);
        });
    });
  }

  fetchRelatedIds(product, callback = () => {}) {
    const id = product.id;
    const { related } = this.store;
    let ids = related.get(product.id);

    if (ids) {
      callback(ids);
    } else {
      axios.get(`/products/${id}/related`)
        .then(res => {
          ids = res.data;
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
    // Update to choose between cached data or API call on a per-produict basis
    const { products } = this.store;
    let load = [];
    let loaded = [];

    ids.forEach(id => {
      let product = products.get(id);
      if (product) {
        loaded.push(product);
      } else {
        load.push(id);
      }
    });

    if (load.length) {

      return axios.get(`/multipleProducts?ids=${load.join('&ids=')}`)
        .then(res => {
          console.log(res.data);
          if (loaded.length) {
            loaded.concat(res.data);
          } else {
            loaded = res.data;
          }
        })
        .catch(err => {
          console.log(err.stack);
        });
    } else {
      if (loaded.length) {
        return Promise.resolve(loaded);
      } else {
        return Promise.reject('No product data');
      }
    }
    // const { products } = this.map;
    // if (ids && products) {
    //   // console.log(ids);
    //   const relatedProducts = ids.map(id => (products.get(id)));
    //   // console.log(relatedProducts);
    //   return relatedProducts;
    // }
    // return [];
  }

  mapAllProductsById() {
    return axios.get('/products?count=1000000')
      .then(res => {
        const { products: map } = this.store;
        const allProducts = res.data;
        for (let i = 0, end = allProducts.length; i < end; i++) {
          const product = allProducts[i];
          map.set(product.id, product);
        }
        this.products = allProducts;
      })
      .catch(err => {
        console.log(err.stack);
      });
  }

  selectProduct(product) {
    this.collectRelatedProducts(product);
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
    this.collectRelatedProducts(this.props.selectedProduct);
  }

  componentDidUpdate() {
    const { related } = this.store;
    if (!related.get(this.props.selectedProduct.id)) {
      this.collectRelatedProducts(this.props.selectedProduct);
    }
  }

  render() {
    const { related, outfit } = this.state;
    const { selectedProduct, selectProduct } = this.props;

    console.log('RelatedProducts re-render');
    return (
      <div id='RelatedProdcuts'>
        <ProductsCarousel
          // key={ selectedProduct }
          products={ related }
          selectedProduct={ selectedProduct }
          selectProduct={ this.selectProduct }
        />
        <OutfitCarousel
          products={this.store.products}
          outfit={ outfit }
        />
        {/* <RelatedProductsOutfit /> */}
      </div>
    );
  }
}


export default RelatedProducts;