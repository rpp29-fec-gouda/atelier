"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ZoomedImageModel_js_1 = __importDefault(require("./ZoomedImageModel.js"));
require("./zoomedImage.css");
class ZoomedImageController {
    constructor(containerId, imageId, resultId = '', zoom = 2.5, overlay = true) {
        this.zoom = zoom;
        this.overlay = overlay;
        this.containerId = containerId;
        this.imageId = imageId;
        this.resultId = resultId;
        this._generateResult = (this.resultId === '');
        this.containerClassName = 'img-zoom-container';
        this.resultClassName = 'img-zoom-result';
        this.lensClassname = 'img-zoom-lens';
    }
    setup() {
        if (!this._initializeContainer()) {
            console.log(`No container element found with the id ${this.containerId}`);
            return;
        }
        const img = this._getImage();
        if (!img) {
            console.log(`No img element found with the id ${this.imageId}`);
            return;
        }
        const lens = this._initializeLens(img);
        if (!lens) {
            console.log('Lens element not initialized', this._getContainer());
            return;
        }
        const result = this._initializeResult(img);
        if (!result) {
            console.log('Result elements not initialized', this._getContainer());
            return;
        }
        this._setResultStyles(result, img);
        this._setLensStyles(lens, result, img);
        const zoomedImageModel = new ZoomedImageModel_js_1.default(img, result, lens);
        const ratioResultLens = zoomedImageModel.getRatioBetweenResultAndLens(result, lens);
        result.style.backgroundSize = `${(img.width * ratioResultLens.x)}px ${(img.height * ratioResultLens.y)}px`;
        this._addEventListeners(img, lens, zoomedImageModel);
        this.moveLens(zoomedImageModel);
    }
    teardown() {
        const img = this._getImage();
        const container = this._getContainer();
        if (!container) {
            console.log('No container element found');
            return;
        }
        const lens = container.getElementsByClassName(this.lensClassname)[0];
        if (!lens) {
            console.log('Lens element not initialized', container);
            return;
        }
        const result = container.getElementsByClassName(this.resultClassName)[0];
        if (!result) {
            console.log('Result elements not initialized', container);
            return;
        }
        this._removeEventListeners(img, lens);
        this._uninitializeElements(lens, result);
    }
    moveLens(zoomedImage, e) {
        e === null || e === void 0 ? void 0 : e.preventDefault();
        const cursorPosition = zoomedImage.getCursorPosition(e, window);
        const lensPosition = zoomedImage.getLensPosition(cursorPosition);
        const lens = zoomedImage.lens;
        lens.style.left = `${lensPosition.x}px`;
        lens.style.top = `${lensPosition.y}px`;
        const result = zoomedImage.result;
        const ratio = zoomedImage.getRatioBetweenResultAndLens();
        result.style.backgroundPosition = `-${lensPosition.x * ratio.x}px -${lensPosition.y * ratio.y}px`;
    }
    _getImage() {
        return document.getElementById(this.imageId);
    }
    _getContainer() {
        return document.getElementById(this.containerId);
    }
    _initializeContainer() {
        const container = this._getContainer();
        container === null || container === void 0 ? void 0 : container.setAttribute('class', this.containerClassName);
        return container;
    }
    _initializeLens(img) {
        const lens = document.createElement('div');
        lens.setAttribute('class', this.lensClassname);
        img.parentElement.insertBefore(lens, img);
        return lens;
    }
    _initializeResult(img) {
        let result = null;
        if (this._generateResult) {
            result = document.createElement('img');
            img.parentElement.insertBefore(result, img);
        }
        else {
            result = document.getElementById(this.resultId);
        }
        result === null || result === void 0 ? void 0 : result.setAttribute('class', this.resultClassName);
        return result;
    }
    _uninitializeElements(lens, result) {
        console.log('_uninitializeElements');
        console.log('removing lens', lens);
        lens === null || lens === void 0 ? void 0 : lens.remove();
        if (this._generateResult) {
            console.log('removing result', result);
            result === null || result === void 0 ? void 0 : result.remove();
        }
        else {
            console.log('modifying result', result);
            result === null || result === void 0 ? void 0 : result.classList.remove(this.resultClassName);
        }
        const container = this._getContainer();
        container.classList.remove(this.containerClassName);
    }
    _setResultStyles(result, img) {
        if (this.overlay) {
            result.style.top = 0;
            result.style.position = 'absolute';
            result.style.zIndex = img.style.zIndex + 1;
            result.style.width = `${img.width}px`;
            result.style.height = `${img.height}px`;
        }
        result.style.backgroundImage = `url('${img.src}')`;
    }
    _setLensStyles(lens, result, img) {
        if (this.zoom) {
            const scale = 1 / this.zoom;
            lens.style.width = `${scale * img.width}px`;
            lens.style.height = `${scale * img.height}px`;
        }
        lens.style.zIndex = result.style.zIndex + 1;
    }
    _addEventListeners(img, lens, zoomedImageModel) {
        const moveLens = this.moveLens.bind(null, zoomedImageModel);
        lens === null || lens === void 0 ? void 0 : lens.addEventListener('mousemove', moveLens);
        img === null || img === void 0 ? void 0 : img.addEventListener('mousemove', moveLens);
        lens === null || lens === void 0 ? void 0 : lens.addEventListener('touchmove', moveLens);
        img === null || img === void 0 ? void 0 : img.addEventListener('touchmove', moveLens);
    }
    _removeEventListeners(img, lens) {
        const moveLens = this.moveLens;
        lens === null || lens === void 0 ? void 0 : lens.removeEventListener('mousemove', moveLens);
        img === null || img === void 0 ? void 0 : img.removeEventListener('mousemove', moveLens);
        lens === null || lens === void 0 ? void 0 : lens.removeEventListener('touchmove', moveLens);
        img === null || img === void 0 ? void 0 : img.removeEventListener('touchmove', moveLens);
    }
}
exports.default = ZoomedImageController;
