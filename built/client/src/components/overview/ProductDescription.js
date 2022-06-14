"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./productDescription.css");
const ProductDescription = (props) => {
    return (<div id="po-product-description">
      <h2 class="bold">{props.slogan}</h2>
      <div>{props.description}</div>
    </div>);
};
exports.default = ProductDescription;
