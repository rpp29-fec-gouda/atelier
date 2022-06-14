"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./popupPhoto.css");
const PopupPhoto = (props) => {
    const src = props.src;
    return (<div className='shared-popup-photo'>
      <img className='shared-full-size-photo' src={src}/>
      <div className='shared-popup-photo-close' onClick={props.close}>X</div>
    </div>);
};
exports.default = PopupPhoto;
