"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const POClickTracker_1 = __importDefault(require("../trackers/POClickTracker"));
const StarRating_1 = __importDefault(require("../shared/StarRating"));
require("./ratingsSummary.css");
const RatingsSummary = (props) => {
    const handleOnClick = () => {
        var _a, _b;
        (_a = props.callback) === null || _a === void 0 ? void 0 : _a.call();
        (_b = document.getElementById('rr-ratings-reviews-widget')) === null || _b === void 0 ? void 0 : _b.scrollIntoView({ behavior: 'smooth' });
    };
    return (<span id="po-product-rating" class="row row-margin">
      {props.reviewCount > 0 ? (<react_1.default.Fragment>
            <StarRating_1.default rating={props.averageRating}/>
            <POClickTracker_1.default eventName="clickTracker" moduleName="Product Overview">
              <div id="po-read-all-reviews" onClick={handleOnClick} class="row link">
                Read all {props.reviewCount} reviews
              </div>
            </POClickTracker_1.default>
          </react_1.default.Fragment>) : (<div>
            Loading Ratings Summary...
          </div>)}
    </span>);
};
exports.default = RatingsSummary;
