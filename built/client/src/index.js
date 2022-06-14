"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const axios_1 = __importDefault(require("axios"));
require("./style.css");
const QA_jsx_1 = __importDefault(require("./components/QA/QA.jsx"));
const RelatedProducts_jsx_1 = __importDefault(require("./components/related/RelatedProducts.jsx"));
const RatingsAndReviews_jsx_1 = __importDefault(require("./components/ratingsReviews/RatingsAndReviews.jsx"));
const ProductOverview_1 = __importDefault(require("./components/overview/ProductOverview"));
const Navbar_jsx_1 = __importDefault(require("./components/shared/Navbar.jsx"));
class App extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.selectProduct = this.selectProduct.bind(this);
        this.checkCache = this.checkCache.bind(this);
        this.updateCache = this.updateCache.bind(this);
        this.cache = {
            products: new Map(),
            questions: new Map(),
            avgRatings: new Map(),
            ratings: new Map(),
            reviews: new Map(),
            relatedIds: new Map(),
            styles: new Map()
        };
        this.state = {
            ready: false,
            selectedProduct: null,
            selectedProductImageURLs: [],
            selectedProductThumbnailURLs: [],
            mode: 'light'
        };
    }
    selectProduct(product) {
        if (this.state.selectedProduct.id !== product.id) {
            if (product) {
                console.log(`${product.name} selected`);
                this.setState({
                    selectedProduct: product
                });
            }
        }
    }
    checkCache(cacheName, productId) {
        return this.cache[cacheName].get(productId);
    }
    updateCache(cacheName, productId, data) {
        this.cache[cacheName].set(productId, data);
    }
    componentDidMount() {
        axios_1.default.get(`/products/${this.props.init.id}`)
            .then(res => {
            const product = res.data;
            this.cache.products.set(product.id, product);
            this.setState({
                selectedProduct: product,
                ready: true
            });
        });
    }
    render() {
        const { products, selectedProduct, ready } = this.state;
        return ready ? (<react_1.default.Fragment>
        <Navbar_jsx_1.default />
        <ProductOverview_1.default selectedProduct={selectedProduct} checkCache={this.checkCache} updateCache={this.updateCache} isTesting={this.props.isTesting}/>
        <hr></hr>
        <RelatedProducts_jsx_1.default selectedProduct={selectedProduct} selectProduct={this.selectProduct} checkCache={this.checkCache} updateCache={this.updateCache}/>
        <hr></hr>
        <QA_jsx_1.default selectedProduct={selectedProduct} checkCache={this.checkCache} updateCache={this.updateCache}/>
        <hr></hr>
        <RatingsAndReviews_jsx_1.default reviews={this.state.reviews} ratings={this.state.ratings} selectedProduct={selectedProduct} checkCache={this.checkCache} updateCache={this.updateCache}/>
      </react_1.default.Fragment>) : (<p>Loading...</p>);
    }
}
exports.default = App;
const randomPage = Math.round(Math.random() * 10);
axios_1.default.get(`/products?page=${randomPage}&count=1`)
    .then(res => {
    const product = res.data[0];
    const div = document.createElement('div');
    div.setAttribute('id', 'App');
    document.body.appendChild(div);
    react_dom_1.default.render(<App init={product}/>, div);
})
    .catch(err => {
    console.log(err.stack);
});
