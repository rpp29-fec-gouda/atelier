"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ProductCard_jsx_1 = __importDefault(require("./ProductCard.jsx"));
class ProductsCarousel extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleAction = this.handleAction.bind(this);
        this.handleNav = this.handleNav.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleTracking = this.handleTracking.bind(this);
        this.containerElement = react_1.default.createRef();
        window.addEventListener('resize', this.handleResize);
        this.containerWidth = 0;
        this.cardWidth = 0;
        this.maxScroll = 0;
        this.navLeftSymbol = String.fromCharCode(12296);
        this.navRightSymbol = String.fromCharCode(12297);
        this.state = {
            showLeftNav: false,
            showRighttNav: false
        };
    }
    handleTracking(event) {
        event.stopPropagation();
        this.props.clickTracker({
            element: `<${event.target.tagName}> ${event.target.className}`,
            widget: 'RP Products Carousel',
            time: new Date()
        });
    }
    resetState() {
        this.setState({
            showLeftNav: false,
            showRightNav: false
        });
    }
    refreshState(scrollPosition) {
        this.setState({
            showLeftNav: scrollPosition !== 0,
            showRightNav: scrollPosition !== this.maxScroll
        });
    }
    navsDisplayed() {
        return this.state.showLeftNav || this.state.showRightNav;
    }
    handleAction(productId) {
        this.props.compare(productId);
    }
    handleScroll(event) {
        if (this.containerWidth > event.target.clientWidth) {
            this.refreshState(event.target.scrollLeft);
        }
        else {
            this.resetState();
        }
    }
    handleNav(event) {
        const cardContainer = this.containerElement.current;
        const cmd = event.currentTarget.id;
        if (cmd === 'rp-right-nav') {
            cardContainer.scrollLeft += this.cardWidth;
        }
        else {
            cardContainer.scrollLeft -= this.cardWidth;
        }
    }
    handleResize() {
        const cardContainer = this.containerElement.current;
        this.containerWidth = cardContainer === null || cardContainer === void 0 ? void 0 : cardContainer.scrollWidth;
        if (this.containerWidth && this.containerWidth < window.innerWidth) {
            this.resetState();
        }
        else {
            const position = cardContainer.scrollLeft;
            this.maxScroll = this.containerWidth - cardContainer.clientWidth;
            this.refreshState(position);
        }
    }
    componentDidMount() {
        console.log('RP scroll container', this.containerElement);
        const cardContainer = this.containerElement.current;
        if (cardContainer) {
            this.cardWidth = cardContainer.firstChild.offsetWidth;
            console.log('242?', this.cardWidth);
            this.containerWidth = cardContainer.scrollWidth;
            if (this.containerWidth > window.innerWidth) {
                this.maxScroll = cardContainer.scrollWidth - this.containerWidth;
                this.setState({
                    showRightNav: true
                });
            }
        }
    }
    componentDidUpdate() {
        const cardContainer = this.containerElement.current;
        if (cardContainer && cardContainer.scrollWidth !== this.containerWidth) {
            console.log(cardContainer.scrollWidth, this.containerWidth);
            this.containerWidth = cardContainer.scrollWidth;
            if (this.containerWidth > window.innerWidth) {
                const nextMaxOffset = this.containerWidth - cardContainer.clientWidth;
                if (this.maxScroll !== nextMaxOffset) {
                    this.maxScroll = nextMaxOffset;
                    console.log('Card width:', this.cardWidth);
                    console.log('View width:', cardContainer.clientWidth);
                    console.log('Container width:', this.containerWidth);
                    console.log('Max left offset:', this.maxScroll);
                    this.setState({
                        containerLeftOffset: 0,
                        showLeftNav: false,
                        showRightNav: true
                    });
                }
            }
            else {
                this.resetState();
            }
        }
    }
    render() {
        const { containerElement, navLeftSymbol, navRightSymbol, handleScroll, handleAction, handleTracking } = this;
        const { productIds, selectProduct, selectedProduct, compare, checkCache, updateCache, clickTracker } = this.props;
        const { containerLeftOffset, showLeftNav, showRightNav } = this.state;
        let key = 0;
        return (<div id='ProductsCarousel' onClick={handleTracking}>
        <span className='rp-component-title'>RELATED PRODUCTS</span>
        <div className='rp-carousel-viewport'>
          {showLeftNav ? <div id='rp-left-nav' className='rp-carousel-nav rp-nav-left' onClick={this.handleNav}><span className='rp-nav-symbol'>{navLeftSymbol}</span></div> : null}
          <div className='rp-card-container' onScroll={handleScroll} ref={containerElement}>{Array.isArray(productIds) && productIds.length ? (productIds.map(id => (<ProductCard_jsx_1.default key={`rpCard${id}`} type='Related' productId={id} selectedProduct={selectedProduct} selectProduct={selectProduct} action={handleAction} checkCache={checkCache} updateCache={updateCache} clickTracker={clickTracker}/>))) : (<div className='rp-card rp-card-placeholder'>Searching...</div>)}
          </div>
          {showRightNav ? <div id='rp-right-nav' className='rp-carousel-nav rp-nav-right' onClick={this.handleNav}><span className='rp-nav-symbol'>{navRightSymbol}</span></div> : null}
        </div>
      </div>);
    }
}
exports.default = ProductsCarousel;
