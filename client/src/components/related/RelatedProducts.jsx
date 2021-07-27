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

    this.map = {
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
      this.setState({
        related: this.collectProductsById(ids)
      });
    });
  }

  fetchRelatedIds(product, callback = () => {}) {
    const id = product.id;
    const { related } = this.map;
    let ids = related.get(product.id);

    if (ids) {
      callback(ids);
    } else {
      axios.get(`/products/${id}/related`)
        .then(res => {
          ids = res.data;
          related.set(id, ids)
          callback(ids);
          // this.setState({ related: res.data });
        })
        .catch(err => {
          console.log(err.stack);
        });
    }
  }

  collectProductsById(ids) {
    const { products } = this.map;
    if (ids && products) {
      // console.log(ids);
      const relatedProducts = ids.map(id => (products.get(id)));
      // console.log(relatedProducts);
      return relatedProducts;
    }
    return [];
  }

  mapAllProductsById() {
    return axios.get('/products?count=1000000')
      .then(res => {
        const { products: map } = this.map;
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
    this.mapAllProductsById()
      .then(() => {
        this.props.updateProductData(this.products, this.map.products);
        this.collectRelatedProducts(this.props.selectedProduct);
      })
      .catch(err => {
        console.log(err.stack);
      });
  }

  componentDidUpdate() {
    const { related } = this.map;
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
          outfit={ outfit }
        />
        {/* <RelatedProductsOutfit /> */}
      </div>
    );
  }
}


export default RelatedProducts;