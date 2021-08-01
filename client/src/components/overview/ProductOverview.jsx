import React from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery';
import ProductInformation from './ProductInformation';
import StyleSelector from './StyleSelector';
import Cart from './Cart';
import ProductDescription from './ProductDescription';
import './productOverview.css';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);

    this.styles = [];

    this.state = {
      selectedStyle: null
    };

    this.fetchProductStyles = this.fetchProductStyles.bind(this);
    this.getDefaultStyle = this.getDefaultStyle.bind(this);
    this.getStyleSelectorItems = this.getStyleSelectorItems.bind(this);
    this.getStyleDefaultPhotoUrl = this.getStyleDefaultPhotoUrl.bind(this);
    this.handleStyleClick = this.handleStyleClick.bind(this);
    this.getStyleById = this.getStyleById.bind(this);
    this.setStyleById = this.setStyleById.bind(this);
  }

  componentDidMount() {
    this.fetchProductStyles(this.props.selectedProduct.id);
  }

  fetchProductStyles(id) {
    axios.get(`/products/${id}/styles`)
      .then(res => {
        this.styles = res.data.results;
        console.log(`Styles: ${JSON.stringify(this.styles)}`);
        this.getDefaultStyle();
      })
      .catch(err => {
        console.log(err.stack);
      });
  }

  getDefaultStyle() {
    console.log('Getting default style');
    for (const style of this.styles) {
      console.log(`Style ${JSON.stringify(style)}`);
      console.log('Is default?', style['default?']);
      if (style['default?']) {
        console.log('Found default');
        this.setState({
          selectedStyle: style
        });
        return;
      }
    }
    console.log('No default found!');
    this.setState({
      selectedStyle: null
    });
  }

  getStyleById(id) {
    if (typeof id === 'string') {
      id = parseInt(id);
    }
    for (const style of this.styles) {
      if (style.style_id === id) {
        console.log('Matching style found');
        return style;
      }
    }
    console.log('NO Matching style found!');
    return;
  }

  setStyleById(id) {
    const style = this.getStyleById(id);
    console.log('Getting style by ID:', style);
    if (style) {
      console.log('Updating style to id', id);
      this.setState({
        selectedStyle: style
      });
    }
  }

  getStyleSelectorItems() {
    const styleItems = [];
    this.styles.forEach(style => {
      styleItems.push({
        id: style.style_id,
        thumbnail: this.getStyleDefaultPhotoUrl(style)
      });
    });
    return styleItems;
  }

  getStyleDefaultPhotoUrl(style) {
    if (style.photos.length === 0) {
      return '';
    } else {
      return style.photos[0].thumbnail_url;
    }
  }

  handleStyleClick(id) {
    console.log(`Style id ${id} clicked`);
    this.setStyleById(id);
  }

  render() {
    const selectedProduct = this.props.selectedProduct;
    const selectedStyle = this.state.selectedStyle;
    if (selectedProduct === null || selectedStyle === null) {
      return (<div>Loading...</div>);
    }

    const { slogan, description } = selectedProduct;

    const styleId = selectedStyle.style_id;
    const selectorItems = this.getStyleSelectorItems();

    console.log('Rendering product overview');
    console.log(`Selected style ${JSON.stringify(this.state.selectedStyle)}`);
    return (
      <div id="product-overview">
        <div class="row">
          <ImageGallery
            styleId={ styleId }
            photos={ selectedStyle.photos }
          />
          <div id="product-col-right" class="column">
            <ProductInformation
              name={ selectedProduct.name }
              category={ selectedProduct.category }
              defaultPrice={ selectedProduct.default_price }
              originalPrice={ selectedStyle.original_price }
              salePrice={ selectedStyle.sale_price }
            />
            <StyleSelector
              selectedId = { styleId }
              name={ selectedStyle.name }
              items={ selectorItems }
              onClick={ this.handleStyleClick }
            />
            <Cart
              skus={ selectedStyle.skus }
            />
          </div>
        </div>
        {
          slogan && description &&
          <ProductDescription
            slogan={ slogan }
            description={ description }
          />
        }
      </div>
    );
  }
}

export default ProductOverview;