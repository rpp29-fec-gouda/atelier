import React from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery';
import ProductInformation from './ProductInformation';
import StyleSelector from './StyleSelector';
import Cart from './Cart';
import ProductDescription from './ProductDescription';
import './productOverview.css';
// import ZoomedImageModel from './ZoomedImageModel.js';
// import './zoomedImage.css';
// import ZoomedImageController from './ZoomedImageController.js';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);

    this.numberOfReviews = 0;
    this.averageRating = 0;
    this.styles = [];

    this.state = {
      selectedStyle: null,
      sizesAvailable: [],
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

    // this.imageZoom = this.imageZoom.bind(this);
  }

  componentDidMount() {
    this.loadAdditionalProductData(this.props.selectedProduct?.id);
  }

  loadAdditionalProductData(id) {
    if (!id || id === null) {
      console.log('Product ID is null');
      return;
    }
    if (this.props.isTesting) {
      this.ratings = this.props.ratings;
      this.updateRatingsProperties(this.ratings);
      this.styles = this.props.styles;
      this.updateDefaultStyle();
      return;
    }
    Promise.all([this.fetchRatings(id), this.fetchProductStyles(id)])
      .then(res => {
        this.ratings = res[0].data.ratings;
        this.updateRatingsProperties(this.ratings);
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

  updateDefaultStyle() {
    console.log('Updating default style');
    const defaultStyle = this.getDefaultStyle();
    this.updateState(defaultStyle);
  }

  getDefaultStyle() {
    for (const style of this.styles) {
      if (style['default?']) {
        return style;
      }
    }
    console.log('No default found! Using first style...');
    return this.styles.length > 0 ? this.styles[0] : null;
  }

  getStyleById(id) {
    id = parseInt(id);
    for (const style of this.styles) {
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
      const style = this.getStyleById(id);
      if (style) {
        this.updateState(style);
      }
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

  updateRatingsProperties(ratings) {
    console.log(`Product Ratings: ${JSON.stringify(ratings)}`);
    this.numberOfReviews = this.getNumberOfReviews(ratings);
    this.averageRating = this.getAverageRating(ratings, this.numberOfReviews);
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

  // imageZoom(imgID, resultID, zoom = 2.5) {
  //   const img = document.getElementById(imgID);

  //   // create & insert lens
  //   const lens = document.createElement('div');
  //   lens.setAttribute('class', 'img-zoom-lens');
  //   img.parentElement.insertBefore(lens, img);

  //   if (zoom) {
  //     const scale = 1 / zoom;
  //     lens.style.width = `${scale * img.width}px`;
  //     lens.style.height = `${scale * img.height}px`;
  //   }

  //   // Set up result div to display image
  //   let result = document.getElementById(resultID);
  //   console.log('result', result);
  //   if (result === null) {
  //     result = document.createElement('img');
  //     result.setAttribute('class', 'img-zoom-result');
  //     img.parentElement.insertBefore(result, img);
  //   }

  //   result.style.top = 0;
  //   result.style.position = 'absolute';
  //   result.style.zIndex = img.style.zIndex + 1;
  //   result.style.width = `${img.width}px`;
  //   result.style.height = `${img.height}px`;
  //   result.style.backgroundImage = `url('${img.src}')`;

  //   lens.style.zIndex = result.style.zIndex + 1;

  //   const zoomedImage = new ZoomedImageModel(img, result, lens);

  //   const ratioResultLens = zoomedImage.getRatioBetweenResultAndLens(result, lens);
  //   result.style.backgroundSize = `${(img.width * ratioResultLens.x)}px ${(img.height * ratioResultLens.y)}px`;

  //   // execute a function when someone moves the cursor over the image, or the lens
  //   const moveLens = this.moveLens.bind(null, zoomedImage);
  //   lens.addEventListener('mousemove', moveLens);
  //   img.addEventListener('mousemove', moveLens);

  //   // touch screen events
  //   lens.addEventListener('touchmove', moveLens);
  //   img.addEventListener('touchmove', moveLens);
  // }

  // moveLens(zoomedImage, e) {
  //   // prevent any other actions that may occur when moving over the image:
  //   e.preventDefault();

  //   const cursorPosition = zoomedImage.getCursorPosition(e, window);
  //   const lensPosition = zoomedImage.getLensPosition(cursorPosition);

  //   // set the position of the lens:
  //   const lens = zoomedImage.lens;
  //   lens.style.left = `${lensPosition.x}px`;
  //   lens.style.top = `${lensPosition.y}px`;

  //   // display what the lens "sees"
  //   const result = zoomedImage.result;
  //   const ratio = zoomedImage.getRatioBetweenResultAndLens();
  //   result.style.backgroundPosition = `-${lensPosition.x * ratio.x}px -${lensPosition.y * ratio.y}px`;
  // }

  handleImageZoom(e) {
    // e.stopPropagation();
    const isZoomed = !this.state.isZoomed;
    console.log('isZoomed', isZoomed);

    // const imgId = 'po-image'; // TODO: Abstract this or move most of this back to ImageGallery
    // if (isZoomed) {
    //   const containerDiv = e.currentTarget;
    //   console.log('containerDiv', containerDiv);
    //   console.log('containerDiv.id', containerDiv.id);

    //   const controller = new ZoomedImageController(containerDiv.id, imgId);
    //   controller.setup();
    // } else {
    //   controller.teardown();
    // }

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
    const selectorItems = this.getStyleSelectorItems();
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