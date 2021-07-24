import React from 'react';
import RelatedProductsCarousel from './RelatedProductsCarousel.jsx';
import OutfitCarousel from './OutfitCarousel.jsx';
import axios from 'axios';
import '../css/RelatedProducts.css';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      selectedProduct: this.props.selectedProduct,
      products: [],
      outfit: []
    };
  }

  loadRelatedProducts(product) {
    axios.get(`/products/${product.id}/related`)
    .then(res => {
      this.setState({ products: res.data });
    })
    .catch(err => {
      console.log(err.stack);
    });
  }

  selectProduct(product) {
    this.loadRelatedProducts(product);
    this.props.selectProduct(product);
  }

  componentDidMount() {
    // In the future this will also need to identify the user and bring up their selected outfit from their past session
    this.loadRelatedProducts(this.props.selectedProduct);
  }

  render() {
    const { products, outfit } = this.state;
    return (
      <div id='RelatedProdcuts'>
        <RelatedProductsCarousel products={products} />
        <OutfitCarousel outfit={outfit} />
        {/* <RelatedProductsOutfit /> */}
      </div>
    );
  }
}


export default RelatedProducts;