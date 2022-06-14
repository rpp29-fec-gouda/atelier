"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const RatingsSummary_1 = __importDefault(require("./RatingsSummary"));
const Price_1 = __importDefault(require("./Price"));
require("./productInformation.css");
const ProductInformation = (props) => {
    console.log('Rendering product information');
    return (<div id="po-product-information">
      <RatingsSummary_1.default reviewCount={props.reviewCount} averageRating={props.averageRating}/>
      <h2 class="uppercase">{props.category}</h2>
      <h1>{props.name}</h1>
      <Price_1.default defaultPrice={props.defaultPrice} originalPrice={props.originalPrice} salePrice={props.salePrice}/>
    </div>);
};
exports.default = ProductInformation;
