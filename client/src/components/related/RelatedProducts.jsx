import React from 'react';
import ProductsCarousel from './ProductsCarousel.jsx';
import OutfitCarousel from './OutfitCarousel.jsx';
import axios from 'axios';
import '../css/RelatedProducts.css';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // ready: false,
      // selectedProduct: {},
      related: [],
      outfit: []
    };
  }

  collectRelatedProducts(product) {
    this.fetchRelatedIds(product, (ids) => {
      this.setState({
        related: this.collectProductsById(ids),
        ready: true
      });
    });
  }

  fetchRelatedIds(product, callback) {
    axios.get(`/products/${product.id}/related`)
    .then(res => {
      callback(res.data);
      // this.setState({ related: res.data });
      return
    })
    .catch(err => {
      console.log(err.stack);
    });
  }

  collectProductsById(idArray) {
    const { products } = this.props;
    console.log(idArray);
    const relatedProducts = idArray.map(id => {
      for (let i = 0, length = products.length; i < length; i++) {
        if (products[i].id === id) {
          return products[i];
        }
      }
    });
    console.log(relatedProducts);
    return relatedProducts;
  }

  selectProduct(product) {
    this.props.selectProduct(product);
  }

  componentDidMount() {
    // In the future this will also need to identify the user and bring up their selected outfit from their past session
    this.collectRelatedProducts(this.props.selectedProduct);
  }

  render() {
    const { related, outfit } = this.state;
    return (
      <div id='RelatedProdcuts'>
        <ProductsCarousel products={related} />
        <OutfitCarousel outfit={outfit} />
        {/* <RelatedProductsOutfit /> */}
      </div>
    );
  }
}


export default RelatedProducts;