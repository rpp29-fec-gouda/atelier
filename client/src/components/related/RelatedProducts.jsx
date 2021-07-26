import React from 'react';
import ProductsCarousel from './ProductsCarousel.jsx';
import OutfitCarousel from './OutfitCarousel.jsx';
import axios from 'axios';
import '../css/RelatedProducts.css';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);

    this.selectProduct = this.selectProduct.bind(this);

    this.state = {
      // ready: false,
      selectedProduct: this.props.selectedProduct,
      products: [],
      productMap: undefined,
      related: [],
      outfit: []
    };
  }

  collectRelatedProducts(product) {
    console.log('Refreshing related products');
    this.fetchRelatedIds(product, (ids) => {
      this.setState({
        related: this.collectProductsById(ids)
      });
    });
  }

  fetchRelatedIds(product, callback = () => {}) {
    axios.get(`/products/${product.id}/related`)
    .then(res => {
      callback(res.data);
      // this.setState({ related: res.data });
    })
    .catch(err => {
      console.log(err.stack);
    });
  }

  mapAllProductsById() {
    return axios.get('/products?count=1000000')
      .then(res => {
        const products = res.data, productMap = new Map();
        for (let i = 0, end = products.length; i < end; i++) {
          productMap.set(products[i].id, products[i]);
        }
        this.setState({
          products: products,
          productMap: productMap
        });
        // console.log(this.state.productMap.get(this.props.selectedProduct.id));
        // callback(productMap.get(id));
      })
      .catch(err => {
        console.log(err.stack);
      });
  }

  // collectProductsById(ids) {
  //   if (ids.length) {
  //     const { products } = this.props;
  //     console.log(ids);
  //     const collection = ids.reduce((relatedProducts, id) => {
  //       for (let i = 0, length = products.length; i < length; i++) {
  //         if (products[i].id === id) {
  //           relatedProducts.push(products[i]);
  //         }
  //         return relatedProducts;
  //       }
  //     }, []);
  //     console.log(collection);
  //     return collection;
  //   }
  //   // console.log(relatedProducts);
  //   // return relatedProducts;
  //   return [];
  // }

  collectProductsById(ids) {
    if (ids && this.state.productMap) {
      const { productMap } = this.state;
      // console.log(ids);
      const relatedProducts = ids.map(id => (productMap.get(id)));
      // console.log(relatedProducts);
      return relatedProducts;
    }
    return [];
  }

  selectProduct(product) {
    this.collectRelatedProducts(product);
    this.props.selectProduct(product);
  }

  componentDidMount() {
    // In the future this will also need to identify the user and bring up their selected outfit from their past session
    // this.mapProductsById(this.props.products);
    // this.collectRelatedProducts(this.props.selectedProduct);
    this.mapAllProductsById()
      .then(() => {
        this.props.updateProductMap(this.state.products, this.state.productMap);
        this.collectRelatedProducts(this.state.selectedProduct);
      })
      .catch(err => {
        console.log(err.stack);
      });
  }

  render() {
    const { selectedProduct, related, outfit } = this.state;
    const { selectProduct, productMap } = this.props;

    // const relatedProducts = this.collectProductsById(related);
    return (
      <div id='RelatedProdcuts'>
        <ProductsCarousel products={ related } selectedProduct={ selectedProduct } selectProduct={ this.selectProduct } main={ this.props.main } />
        <OutfitCarousel outfit={ outfit } />
        {/* <RelatedProductsOutfit /> */}
      </div>
    );
  }
}


export default RelatedProducts;