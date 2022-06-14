"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const axios_1 = __importDefault(require("axios"));
const ImageGallery_1 = __importDefault(require("./ImageGallery"));
const ProductInformation_1 = __importDefault(require("./ProductInformation"));
const StyleSelector_1 = __importDefault(require("./StyleSelector"));
const Cart_1 = __importDefault(require("./Cart"));
const ProductDescription_1 = __importDefault(require("./ProductDescription"));
require("./productOverview.css");
class ProductOverview extends react_1.default.Component {
    constructor(props) {
        var _a;
        super(props);
        this.state = {
            selectedId: (_a = props.selectedProduct) === null || _a === void 0 ? void 0 : _a.id,
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
        var _a;
        this.loadAdditionalProductData((_a = this.props.selectedProduct) === null || _a === void 0 ? void 0 : _a.id);
    }
    componentDidUpdate() {
        var _a;
        const { selectedProduct } = this.props;
        const matchId = selectedProduct.id;
        if (this.state.selectedId !== matchId) {
            this.setState({ selectedId: matchId });
            this.loadAdditionalProductData((_a = this.props.selectedProduct) === null || _a === void 0 ? void 0 : _a.id);
        }
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
            console.log(`${styles.results.length} existing styles associated with product ID ${productId}:`, styles.results);
            callback(styles.results);
        }
        else {
            console.log(`⭐⭐⭐ GET request for STYLES of product id ${productId} ⭐⭐⭐`);
            axios_1.default.get(`/products/${productId}/styles`)
                .then(res => {
                styles = res.data.results;
                console.log(`⭐ ${styles.length} new styles associated with product ID ${productId} ⭐`, styles);
                updateCache('styles', productId, res.data);
                callback(styles);
            })
                .catch(err => {
                console.log(err.stack);
            });
        }
    }
    fetchRatings(productId, callback) {
        const { checkCache, updateCache } = this.props;
        let ratings = checkCache('ratings', productId);
        if (ratings) {
            console.log(`Existing ratings associated with product ID ${productId}:`, JSON.stringify(ratings));
            callback(ratings.ratings);
        }
        else {
            console.log(`⭐⭐⭐ GET request for RATINGS of product id ${productId} ⭐⭐⭐`);
            axios_1.default.get(`reviews/meta?product_id=${productId}`)
                .then(res => {
                ratings = res.data.ratings;
                console.log(`⭐ New ratings associated with product ID ${productId} ⭐`, JSON.stringify(ratings));
                updateCache('ratings', productId, res.data);
                callback(res.data.ratings);
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
        }
        else {
            console.log('Style Selected: ', style);
            this.setState({
                selectedStyle: style,
                sizesAvailable: this.getSizesInStock(style.skus)
            });
        }
    }
    updateDefaultStyle(styles) {
        console.log('Updating default style');
        console.log('styles', styles);
        const defaultStyle = this.getDefaultStyle(styles);
        this.updateState(defaultStyle);
    }
    updateRatingsProperties(ratings) {
        if (!ratings) {
            return;
        }
        const numberOfReviews = this.getNumberOfReviews(ratings);
        this.setState({
            numberOfReviews: numberOfReviews,
            averageRating: this.getAverageRating(ratings, numberOfReviews)
        });
    }
    getDefaultStyle(styles) {
        console.log(styles);
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
            if (style) {
                this.updateState(style);
            }
        }
    }
    getStyleSelectorItems(styles) {
        const styleItems = [];
        styles === null || styles === void 0 ? void 0 : styles.forEach(style => {
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
        }
        else {
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
        let score = 0;
        for (const value in ratings) {
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
            console.log('Product Overview: First render');
            return (<div id="product-overview">
          Loading Product Overview...
        </div>);
        }
        const { slogan, description } = selectedProduct;
        const styleId = selectedStyle.style_id;
        const selectorItems = this.getStyleSelectorItems(this.state.styles);
        console.log('Rendering product overview');
        console.log('styleId', styleId);
        return (<div id="product-overview">
        <div class="row">
          <ImageGallery_1.default photos={selectedStyle.photos} isExpanded={this.state.isExpanded} isZoomed={this.state.isZoomed} onClickExpand={this.handleExpandedView} onClickCollapse={this.handleCollapsedView} onClickZoom={this.handleImageZoom}/>
          {!this.state.isExpanded &&
                <div id="po-col-right" class="column">
              <ProductInformation_1.default name={selectedProduct.name} averageRating={this.state.averageRating} reviewCount={this.state.numberOfReviews} category={selectedProduct.category} defaultPrice={selectedProduct.default_price} originalPrice={selectedStyle.original_price} salePrice={selectedStyle.sale_price}/>
              <StyleSelector_1.default selectedId={styleId} name={selectedStyle.name} items={selectorItems} onClick={this.handleStyleClick}/>
              <Cart_1.default selectedId={styleId} skus={sizesAvailable}/>
            </div>}
        </div>
        {slogan && description &&
                <ProductDescription_1.default slogan={slogan} description={description}/>}
      </div>);
    }
}
exports.default = ProductOverview;
