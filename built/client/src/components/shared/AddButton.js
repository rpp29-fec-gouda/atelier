"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./addButton.css");
const AddButton = (props) => {
    return (<div id={props.id} class="button uppercase" onClick={props.onClick}>{props.label}  <div class="plus">+</div></div>);
};
exports.default = AddButton;
