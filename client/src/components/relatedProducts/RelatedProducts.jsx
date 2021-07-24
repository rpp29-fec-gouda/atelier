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
      products: [],
      outfit: []
    };
  }

  loadRelatedProducts(id) {
    axios.get(`/products/${id}/related`)
    .then(res => {
      this.setState({ products: res.data });
    })
    .catch(err => {
      console.log(err.stack);
    });
  }

  selectProduct(product) {
    this.loadRelatedProducts(product.id);
    this.props.selectProduct(product);
  }

  componentDidMount() {
    const id = this.props.selectedProduct;
    // In the future this will also need to identify the user and bring up their selected outfit from their past session
    this.loadRelatedProducts(id);
  }

  render() {
    const { products, outfit } = this.state;
    return (
      products.length ? (
        <div id='RelatedProdcuts'>
          <RelatedProductsCarousel products={products} />
          <OutfitCarousel outfit={outfit} />
          {/* <RelatedProductsOutfit /> */}
        </div>
      ) : (
        <p>Loading...</p>
      )
    );
  }
}

export default RelatedProducts;