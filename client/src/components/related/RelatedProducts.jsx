import React from 'react';
import ProductCompare from './ProductCompare.jsx';
import ProductsCarousel from './ProductsCarousel.jsx';
import Outfit from './Outfit.jsx';
import axios from 'axios';
import '../css/RelatedProducts.css';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);

    this.selectProduct = this.selectProduct.bind(this);
    this.compareProduct = this.compareProduct.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);

    this.offsetX = 0;
    this.offsetY = 0;

    this.state = {
      selectedId: null,
      related: [],
      compareTo: null,
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  handleBlur(event) {
    // event.stopPropagation();
    console.log(event.currentTarget, event.relatedTarget);
    if (!event.currentTarget.contains(event.relatedTarget)) {
      this.props.resetCompare(null);
    }
  }

  handleDragStart(event) {
    // event.stopPropagation();
    let x = event.nativeEvent.offsetX;
    let y = event.nativeEvent.offsetY;

    console.log(`Grabbed at: ${x}, ${y}`);
    this.offsetX = event.nativeEvent.offsetX;
    this.offsetY = event.nativeEvent.offsetY;
  }

  handleDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  handleDrop(event) {
    // event.stopPropagation();
    let x = event.clientX - this.offsetX;
    let y = event.clientY - this.offsetY;

    console.log(`New position: ${x}, ${y}`);

    this.setState({
      x: x,
      y: y
    });
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
  }

  compareProduct(productId) {
    const product = this.props.checkCache('products', productId);
    console.log(`Compare ${this.props.selectedProduct.name} with ${product.name}`);
    this.setState({ compareTo: product });
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
      console.log(this.state.selectedId, matchId);
      this.fetchRelatedIds(selectedProduct, (ids) => {
        this.setState({ related: ids });
      });
    }
  }

  render() {
    const { compareProduct } = this;
    const { related, outfit, compareTo } = this.state;
    const { selectedProduct, selectProduct, checkCache, updateCache } = this.props;

    return (
      <div id='RelatedProducts' >
        <ProductsCarousel
          productIds={ related }
          selectedProduct={ selectedProduct }
          selectProduct={ selectProduct }
          checkCache={ checkCache }
          updateCache={ updateCache }
          compare={compareProduct}
        />
        <Outfit
          // productIds={ outfit }
          // updateOutfit={ this.updateOutfit }
          selectedProduct={ selectedProduct }
          selectProduct={ selectProduct }
          checkCache={ checkCache }
          updateCache={ updateCache }
        />
        { this.state.compareTo ? (
          <form id='ProductCompare' draggable='true' onDragStart={this.handleDragStart} onDragOver={this.handleDragOver} onDrop={this.handleDrop} onBlur={this.handleBlur}>
            <ProductCompare
              selectedProduct={selectedProduct}
              compareTo={compareTo}
              resetCompare={compareProduct}
              checkCache={checkCache}
              updateCache={updateCache}
            />
          </form>
        ) : null}
      </div>
    );
  }
}

export default RelatedProducts;
