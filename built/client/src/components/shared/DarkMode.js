"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./darkMode.css");
const DarkMode = (props) => {
    const [isDarkModeActive, setIsDarkModeActive] = (0, react_1.useState)(false);
    const switchModes = (mode) => {
        if (mode === 'light') {
            setIsDarkModeActive(false);
        }
        else if (mode === 'dark') {
            setIsDarkModeActive(true);
        }
    };
    isDarkModeActive ? document.body.classList.add('background-dark') : document.body.classList.remove('background-dark');
    return (<div className={isDarkModeActive ? 'toggle-dark' : 'toggle-light'}>
      {isDarkModeActive ?
            <h2 className='light-mode' onClick={() => switchModes('light')}>Light</h2>
            : <h2 className='dark-mode' onClick={() => switchModes('dark')}>Dark</h2>}
    </div>);
};
exports.default = DarkMode;
