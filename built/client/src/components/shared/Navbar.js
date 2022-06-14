"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./navbar.css");
const DarkMode_jsx_1 = __importDefault(require("./DarkMode.jsx"));
const Navbar = (props) => {
    return (<div className='shared-navbar'>
      <div className='shared-logos'>
        <h2 className='dark-on-orange-text'>Gouda</h2>
        <DarkMode_jsx_1.default />
      </div>
      <div className='shared-announcements'>
        <div className='shared-announcement site-wide uppercase'>Site-wide announcement message!</div>
        <div className='shared-announcement sale-discount uppercase'> - sale / discount offer</div>
        <div className='shared-announcement new-product uppercase'> new product highlight</div>
      </div>
    </div>);
};
exports.default = Navbar;
