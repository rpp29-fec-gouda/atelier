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

    this.numberOfReviews = 0;
    this.averageRating = 0;
    this.styles = [];

    this.state = {
      selectedStyle: null
    };

    this.fetchProductStyles = this.fetchProductStyles.bind(this);
    this.getDefaultStyle = this.updateDefaultStyle.bind(this);
    this.getStyleSelectorItems = this.getStyleSelectorItems.bind(this);
    this.getStyleDefaultPhotoUrl = this.getStyleDefaultPhotoUrl.bind(this);
    this.handleStyleClick = this.handleStyleClick.bind(this);
    this.getStyleById = this.getStyleById.bind(this);
    this.setStyleById = this.setStyleById.bind(this);
  }

  componentDidMount() {
    this.loadAdditionalProductData(this.props.selectedProduct.id);
  }

  loadAdditionalProductData(id) {
    Promise.all([this.fetchRatings(id), this.fetchProductStyles(id)])
      .then(res => {
        console.log('res: ', res);
        this.ratings = res[0].data.ratings;
        console.log(`ProductOverview Ratings: ${JSON.stringify(this.ratings)}`);
        this.numberOfReviews = this.getNumberOfReviews(this.ratings);
        this.averageRating = this.getAverageRating(this.ratings, this.numberOfReviews);

        this.styles = res[1].data.results;
        this.updateDefaultStyle();
      })
      .catch(error => {
        console.error(error.stack);
      });
  }

  fetchProductStyles(id) {
    return axios.get(`/products/${id}/styles`);
  }

  fetchRatings(id) {
    return axios.get(`reviews/meta?product_id=${id}`);
  }

  updateDefaultStyle() {
    console.log('Updating default style');
    for (const style of this.styles) {
      if (style['default?']) {
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
        return style;
      }
    }
    console.log('NO Matching style found!');
    return;
  }

  setStyleById(id) {
    const style = this.getStyleById(id);
    if (style) {
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

  getNumberOfReviews(ratings) {
    let numberOfReviews = 0;
    for (const count in ratings) {
      numberOfReviews += parseInt(ratings[count]);
    }
    return numberOfReviews;
  }

  getAverageRating(ratings, reviews) {
    if (!reviews || reviews === 0) {
      return 0;
    }

    let ratingValues = Object.keys(ratings);
    let score = 0;
    for (let i = 0; i < ratingValues.length; i++) {
      const value = ratingValues[i];
      const ratingCount = ratings[value];
      score += value * ratingCount;
    }
    return score / reviews;
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
              averageRating={this.averageRating}
              reviewCount={this.numberOfReviews}
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