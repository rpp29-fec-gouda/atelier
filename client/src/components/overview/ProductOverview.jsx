import React from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery';
import ProductInformation from './ProductInformation';
import StyleSelector from './StyleSelector';
import Cart from './Cart';
import ProductDescription from './ProductDescription';
import './productOverview.css';

class ProductOverview extends React.Component {
  constructor(props) { // = {
  //   selectedProduct,
  //   checkCache,
  //   updateCache
  // }
    super(props);

    this.state = {
      styles: [],
      selectedStyle: null,
      sizesAvailable: [],
      numberOfReviews: 0,
      averageRating: 0,
      isExpanded: false,
      isZoomed: false
    };

    this.fetchProductStyles = this.fetchProductStyles.bind(this);
    this.updateState = this.updateState.bind(this);
    this.handleExpandedView = this.handleExpandedView.bind(this);
    this.handleCollapsedView = this.handleCollapsedView.bind(this);
    this.handleImageZoom = this.handleImageZoom.bind(this);
    this.getDefaultStyle = this.getDefaultStyle.bind(this);
    this.updateDefaultStyle = this.updateDefaultStyle.bind(this);
    this.getStyleSelectorItems = this.getStyleSelectorItems.bind(this);
    this.getStyleDefaultPhotoUrl = this.getStyleDefaultPhotoUrl.bind(this);
    this.handleStyleClick = this.handleStyleClick.bind(this);
    this.getStyleById = this.getStyleById.bind(this);
    this.setStyleById = this.setStyleById.bind(this);
    this.updateRatingsProperties = this.updateRatingsProperties.bind(this);
  }

  componentDidMount() {
    this.loadAdditionalProductData(this.props.selectedProduct?.id);
  }

  loadAdditionalProductData(id) {
    console.log('Loading Product Overview data...');
    if (!id || id === null) {
      console.log('Product ID is null');
      return;
    }

    if (this.props.isTesting) {
      this.updateRatingsProperties(this.props.ratings);
      this.updateDefaultStyle(this.props.styles);
      return;
    }

    this.fetchRatings(id, this.updateRatingsProperties);
    this.fetchProductStyles(id, (styles) => {
      this.setState({ styles });
      this.updateDefaultStyle(styles);
    });
  }

  fetchProductStyles(productId, callback) {
    const { checkCache, updateCache } = this.props;
    let styles = checkCache('styles', productId);

    if (styles) {
      console.log(`${styles.length} existing styles associated with product ID ${productId}:`, styles);
      callback(styles);
    } else {
      axios.get(`/products/${productId}/styles`)
        .then(res => {
          styles = res.data.results;
          console.log(`${styles.length} new styles associated with product ID ${productId}`, styles);
          updateCache('styles', productId, styles);
          callback(styles);
        })
        .catch(err => {
          console.log(err.stack);
        });
    }
  }

  fetchRatings(productId, callback) {
    const { checkCache, updateCache } = this.props;
    let ratings = checkCache('ratings', ratings);

    if (ratings) {
      console.log(`Existing ratings associated with product ID ${productId}:`, JSON.stringify(ratings));
      callback(ratings);
    } else {
      axios.get(`reviews/meta?product_id=${productId}`)
        .then(res => {
          ratings = res.data.ratings;
          console.log(`New ratings associated with product ID ${productId}`, JSON.stringify(ratings));
          updateCache('ratings', productId, ratings);
          callback(ratings);
        })
        .catch(err => {
          console.log(err.stack);
        });
    }
  }

  updateState(style) {
    if (style === null || !style) {
      this.setState({
        selectedStyle: null,
        sizesAvailable: []
      });
    } else {
      console.log('Style Selected: ', style);
      this.setState({
        selectedStyle: style,
        sizesAvailable: this.getSizesInStock(style.skus)
      });
    }
  }

  updateDefaultStyle(styles) {
    console.log('Updating default style');
    const defaultStyle = this.getDefaultStyle(styles);
    this.updateState(defaultStyle);
  }

  updateRatingsProperties(ratings) {
    console.log(`Product Ratings: ${JSON.stringify(ratings)}`);
    const numberOfReviews = this.getNumberOfReviews(ratings);
    this.setState({
      numberOfReviews: numberOfReviews,
      averageRating: this.getAverageRating(ratings, numberOfReviews)
    });
  }

  // TODO: Begin model refactor section
  getDefaultStyle(styles) {
    for (const style of styles) {
      if (style['default?']) {
        return style;
      }
    }
    console.log('No default found! Using first style...');
    return styles.length > 0 ? styles[0] : null;
  }

  getStyleById(id, styles) {
    id = parseInt(id);
    for (const style of styles) {
      if (style.style_id === id) {
        return style;
      }
    }
    console.log('NO Matching style found!');
    return;
  }

  setStyleById(id) {
    id = parseInt(id);
    if (this.state.selectedStyle.style_id !== id) {
      const style = this.getStyleById(id, this.state.styles);
      // TODO: Above can be refactored into model that takes in styles, selectedStyleId, and id
      if (style) {
        this.updateState(style);
      }
    }
  }

  getStyleSelectorItems(styles) {
    const styleItems = [];
    styles?.forEach(style => {
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

    // let ratingValues = Object.keys(ratings);
    let score = 0;
    for (const value in ratings) {
      const ratingCount = ratings[value];
      score += value * ratingCount;
    }

    // for (let i = 0; i < ratingValues.length; i++) {
    //   const value = ratingValues[i];
    //   const ratingCount = ratings[value];
    //   score += value * ratingCount;
    // }
    return score / reviews;
  }


  getSizesInStock(sizes) {
    const isInStock = sku => {
      return !(!sku.quantity || sku.quantity === 0 || sku.quantity === null);
    };

    console.log('Removing out of stock sizes: ', sizes);
    const sizesInStock = {};
    for (const sku in sizes) {
      if (isInStock(sizes[sku])) {
        sizesInStock[sku] = sizes[sku];
      }
    }
    console.log('In stock skus: ', sizesInStock);
    return sizesInStock;
  }
  // TODO: End model refactor section

  handleExpandedView(e) {
    e.stopPropagation();
    this.setState({
      isExpanded: true
    });
  }

  handleCollapsedView(e) {
    if (e.currentTarget.classList.contains('image-gallery-collapsed-view-toggle')) {
      e.stopPropagation();
      this.setState({
        isExpanded: false
      });
    }
  }

  handleImageZoom(e) {
    e.stopPropagation();
    const isZoomed = !this.state.isZoomed;
    console.log('isZoomed', isZoomed);

    this.setState({
      isZoomed: isZoomed
    });
  }

  handleStyleClick(id) {
    console.log(`Style id ${id} clicked`);
    this.setStyleById(id);
  }

  render() {
    const selectedProduct = this.props.selectedProduct;
    const selectedStyle = this.state.selectedStyle;
    const sizesAvailable = this.state.sizesAvailable;

    if (selectedProduct === null || selectedStyle === null) {
      return (<div>Loading...</div>);
    }

    const { slogan, description } = selectedProduct;

    const styleId = selectedStyle.style_id;
    const selectorItems = this.getStyleSelectorItems(this.state.styles);
    console.log('styles', JSON.stringify(selectorItems));
    console.log('Rendering product overview');
    return (
      <div id="product-overview">
        <div class="row">
          <ImageGallery
            photos={selectedStyle.photos}
            isExpanded={this.state.isExpanded}
            isZoomed={this.state.isZoomed}
            onClickExpand={this.handleExpandedView}
            onClickCollapse={this.handleCollapsedView}
            onClickZoom={this.handleImageZoom}
          />
          {
            !this.state.isExpanded &&
            <div id="po-col-right" class="column">
              <ProductInformation
                name={ selectedProduct.name }
                averageRating={this.state.averageRating}
                reviewCount={this.state.numberOfReviews}
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
                skus={ sizesAvailable }
              />
            </div>
          }
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