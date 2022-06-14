"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Calcs_1 = require("../../models/Calcs");
require("./starRating.css");
class StarRating extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.maxStars = props.max ? props.max : 5;
        this.isClickable = (props.callback !== undefined);
        const rating = props.rating ? props.rating : 0;
        this.state = {
            currentRating: Math.min(rating, this.maxStars)
        };
        this.getStarsEmpty = this.getStarsEmpty.bind(this);
        this.getStarCodes = this.getStarCodes.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }
    getStarsFull(rating) {
        const ratingInteger = Math.floor(rating);
        const starsFull = [];
        for (let i = 0; i < ratingInteger; i++) {
            starsFull.push(i);
        }
        return starsFull;
    }
    getStarsEmpty(rating) {
        const ratingEmpty = this.maxStars - Math.ceil(rating);
        const starsEmpty = [];
        for (let i = 0; i < ratingEmpty; i++) {
            starsEmpty.push(i);
        }
        return starsEmpty;
    }
    getStarCodes(rating) {
        const starCodes = [];
        const starsFull = this.getStarsFull(rating);
        starsFull.forEach(() => starCodes.push(100));
        const ratingDecimalRounded25 = (0, Calcs_1.roundByIncrement)(rating, 25) * 100;
        if (ratingDecimalRounded25 !== 0) {
            starCodes.push(ratingDecimalRounded25);
        }
        const starsEmpty = this.getStarsEmpty(rating);
        starsEmpty.forEach(() => starCodes.push(0));
        return starCodes;
    }
    getImage(rating) {
        return `images/starRatings-${rating}.png`;
    }
    getImgAlt(rating) {
        return `Star image ${rating}% full`;
    }
    getStarClasses(isClickable) {
        let imgClass = 'star';
        if (isClickable) {
            imgClass += ' clickable';
        }
        return imgClass;
    }
    handleOnClick(e) {
        this.props.callback(e);
    }
    handleMouseOver(e) {
        var _a, _b;
        const rating = (_b = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.rating;
        console.log('rating: ', rating);
        if (rating && rating !== this.state.currentRating) {
            console.log('Rating:', rating);
            this.setState({
                currentRating: rating
            });
        }
    }
    handleMouseOut() {
        const rating = this.props.rating ? this.props.rating : 0;
        this.setState({
            currentRating: rating
        });
    }
    render() {
        console.log('Rendering Star Rating');
        const starCodes = this.getStarCodes(this.state.currentRating);
        const imgClass = this.getStarClasses(this.isClickable);
        const optsStarRating = {};
        const optsStar = {};
        if (this.isClickable) {
            optsStarRating['onMouseOut'] = this.handleMouseOut;
            optsStar['onClick'] = this.handleOnClick;
            optsStar['onMouseOver'] = this.handleMouseOver;
        }
        let key = 0;
        return (<div class="star-rating" {...optsStarRating}>
        {starCodes.map(starCode => <img key={key++} src={this.getImage(starCode)} alt={this.getImgAlt(starCode)} class={imgClass} data-rating={key} {...optsStar}/>)}
      </div>);
    }
}
exports.default = StarRating;
