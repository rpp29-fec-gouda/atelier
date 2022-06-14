"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./price.css");
const Price = (props) => {
    const defaultPrice = props.defaultPrice ? props.defaultPrice : 0;
    const originalPrice = props.originalPrice ? props.originalPrice : 0;
    return (<div id="po-price" class="row-margin">
      {props.salePrice === null || !props.salePrice
            ?
                `$ ${defaultPrice}`
            :
                <span class="row">
            <div class="po-sale-price">$ {props.salePrice}</div>
            &nbsp;&nbsp;
            <div class="po-original-price">$ {originalPrice}</div>
          </span>}
    </div>);
};
exports.default = Price;
