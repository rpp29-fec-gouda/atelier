"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./modal.css");
const Modal = ({ handleClose, show, children }) => {
    const toggleModal = show ? 'modal display-block' : 'modal display-none';
    return (<div className={toggleModal}>
      <section className='modal-main'>
        {children}
        <button type='button' onClick={handleClose}>
          Exit
        </button>
      </section>
    </div>);
};
exports.default = Modal;
