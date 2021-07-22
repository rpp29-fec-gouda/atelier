import React from 'react';
import RelatedProductsCarousel from './RelatedProductsCarousel.jsx';
// import RelatedProductsOutfit from './RelatedProductsOutift.jsx';
import axios from 'axios';
import './css/RelatedProducts.css';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      products: [],
      outfit: []
    };
  }

  componentDidMount() {
    const id = this.props.selectedProduct;
    // In the future this will also need to identify the user and bring up their selected outfit from their past session
    axios.get(`/products/${id}/related`)
      .then(res => {
        this.setState({ products: res.data });
      })
      .catch(err => {
        console.log(err.stack);
      });
  }

  render() {
    return (
      this.state.products.length ? (
        <div id='RelatedProdcuts'>
          <RelatedProductsCarousel />
          <RelatedProductsCarousel type='outfit' />
          {/* <RelatedProductsOutfit /> */}
        </div>
      ) : (
        <p>Loading...</p>
      )
    );
  }
}

export default RelatedProducts;