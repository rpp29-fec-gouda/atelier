"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const axios_1 = __importDefault(require("axios"));
const StarRating_jsx_1 = __importDefault(require("./StarRating.jsx"));
const stars = [1, 1, 1, .8, 0];
class ProductCard extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.handleActionButtonClick = this.handleActionButtonClick.bind(this);
        this.handleProductClick = this.handleProductClick.bind(this);
        this.handleTracking = this.handleTracking.bind(this);
        this.state = {
            product: undefined,
            productImageURL: '',
            alternateImageURLs: [],
            avgRating: null
        };
    }
    handleTracking(event) {
        event.stopPropagation();
        this.props.clickTracker({
            element: `<${event.target.tagName}> ${event.target.className}`,
            widget: 'RP ProductCard',
            time: new Date()
        });
    }
    handleActionButtonClick(event) {
        event.stopPropagation();
        this.handleTracking(event);
        const { productId, action } = this.props;
        action(productId);
    }
    handleProductClick(event) {
        this.handleTracking(event);
        this.props.selectProduct(this.state.product);
    }
    loadProductData() {
        const { productId, type, checkCache, updateCache } = this.props;
        if (productId) {
            let product = checkCache('products', productId);
            if (product) {
                this.setState({
                    product: product
                });
            }
            else {
                axios_1.default.get(`/products/${productId}`)
                    .then(res => {
                    product = res.data;
                    updateCache('products', productId, product);
                    this.setState({
                        product: product
                    });
                })
                    .catch(err => {
                    this.setState({
                        product: 'productNotFoundError'
                    });
                    console.log(err.stack);
                });
            }
        }
    }
    loadImages() {
        const { productId, checkCache, updateCache } = this.props;
        const product = this.state.product;
        if (productId) {
            let url = '';
            let productStyles = checkCache('styles', productId);
            if (productStyles) {
                url = productStyles.results[0].photos[0].thumbnail_url;
                this.setState({
                    productImageURL: url
                });
            }
            else {
                axios_1.default.get(`/products/${productId}/styles`)
                    .then(res => {
                    updateCache('styles', productId, res.data);
                    url = res.data.results[0].photos[0].thumbnail_url;
                    this.setState({
                        productImageURL: url || ''
                    });
                })
                    .catch(err => {
                    this.setState({
                        productImageURL: ''
                    });
                    console.log(err.stack);
                });
            }
        }
    }
    loadRatings() {
        const { productId, checkCache, updateCache } = this.props;
        const product = this.state.product;
        if (productId) {
            let url = '';
            let avgRating = checkCache('avgRatings', productId);
            if (avgRating) {
                this.setState({
                    avgRating: avgRating
                });
            }
            else {
                axios_1.default.get(`/reviews/meta?product_id=${productId}`)
                    .then(res => {
                    updateCache('ratings', productId, res.data);
                    const ratings = res.data.ratings;
                    const avgRating = this.calcAvgRating(ratings);
                    updateCache('avgRatings', productId, avgRating);
                    this.setState({
                        avgRating: avgRating
                    });
                })
                    .catch(err => {
                    this.setState({
                        productImageURL: ''
                    });
                    console.log(err.stack);
                });
            }
        }
    }
    calcAvgRating(ratings) {
        let avgRating = null;
        if (Object.keys(ratings).length) {
            let numberOfRatings = 0;
            let totalStars = 0;
            for (let key in ratings) {
                let count = parseInt(ratings[key]);
                totalStars += (count * parseInt(key));
                numberOfRatings += count;
            }
            avgRating = parseFloat(totalStars / numberOfRatings).toPrecision(3);
        }
        return avgRating;
    }
    componentDidMount() {
        this.loadProductData();
        this.loadImages();
        this.loadRatings();
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.product) {
            return !(this.state.product.id === nextState.product.id && this.state.productImageURL === nextState.productImageURL && this.state.avgRating === nextState.avgRating);
        }
        else {
            return true;
        }
    }
    render() {
        const { product, productImageURL, avgRating } = this.state;
        if (!product) {
            return <div className='rp-card rp-card-placeholder'>Searching...</div>;
        }
        if (product === 'productNotFoundError') {
            return (<div className='rp-card rp-card-placeholder' onClick={this.handleActionButtonClick}>
          <span>{`Product ${this.props.productId} not found`}</span>
          {type === 'Outfit' ? <span>{'(Click to remove)'}</span> : null}
        </div>);
        }
        const { checkCache, updateCache, productId, selectedProduct, selectProduct, type, action } = this.props;
        const { handleActionButtonClick, handleProductClick } = this;
        let hoverText, actionClass, actionSymbol;
        if (type === 'Outfit') {
            hoverText = `Remove ${product.name} from outfit`;
            actionClass = 'rp-remove-symbol';
            actionSymbol = '+';
        }
        else {
            hoverText = `Compare ${selectedProduct.name} with ${product.name}`;
            actionClass = 'rp-compare-symbol';
            actionSymbol = String.fromCharCode(9733);
        }
        const maxTitleTextLength = 60;
        let trimmedTitle = `${product.name}: ${product.slogan.toLowerCase()}`;
        if (trimmedTitle.length > maxTitleTextLength) {
            const endIndex = Math.min(trimmedTitle.indexOf('.'), trimmedTitle.indexOf(' ', maxTitleTextLength - 10));
            trimmedTitle = trimmedTitle.slice(0, endIndex) + '...';
        }
        let key = 0;
        return (<div className='rp-card' title={`${product.name} overview`} onClick={this.handleProductClick}>
        <div className='rp-image-backer'>
          <img src={productImageURL} alt={product.name}></img>
          <div className={actionClass} title={hoverText} value={productId} onClick={this.handleActionButtonClick}>{actionSymbol}</div>
        </div>
        <div className='rp-info'>
          <span className='rp-category uppercase' title={`${product.name} product category`}>{product.category}</span>
          <span className='rp-title'>{trimmedTitle}</span>
          <span className='rp-price' title={`Default price for ${product.name}`}>{'$' + product.default_price}</span>
          <div className='rp-star-rating' title={`Average customer review for ${product.name}: ${avgRating} out of 5`}>
            <StarRating_jsx_1.default avgRating={avgRating}/>
          </div>
        </div>
      </div>);
    }
}
exports.default = ProductCard;
