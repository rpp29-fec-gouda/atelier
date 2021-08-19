import ZoomedImageModel from './ZoomedImageModel.js';
import './zoomedImage.css';

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

    const zoomedImageModel = new ZoomedImageModel(img, result, lens);
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
    // prevent any other actions that may occur when moving over the image:
    e?.preventDefault();

    const cursorPosition = zoomedImage.getCursorPosition(e, window);
    const lensPosition = zoomedImage.getLensPosition(cursorPosition);

    // set the position of the lens:
    const lens = zoomedImage.lens;
    lens.style.left = `${lensPosition.x}px`;
    lens.style.top = `${lensPosition.y}px`;

    // display what the lens "sees"
    const result = zoomedImage.result;
    const ratio = zoomedImage.getRatioBetweenResultAndLens();
    result.style.backgroundPosition = `-${lensPosition.x * ratio.x}px -${lensPosition.y * ratio.y}px`;
  }


  // === Helpers ===
  _getImage() {
    return document.getElementById(this.imageId);
  }

  _getContainer() {
    return document.getElementById(this.containerId);
  }

  // === Elements ===
  _initializeContainer() {
    const container = this._getContainer();
    container?.setAttribute('class', this.containerClassName);

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
    } else {
      result = document.getElementById(this.resultId);
    }
    result?.setAttribute('class', this.resultClassName);

    return result;
  }

  _uninitializeElements(lens, result) {
    console.log('_uninitializeElements');
    console.log('removing lens', lens);
    lens?.remove();

    if (this._generateResult) {
      console.log('removing result', result);
      result?.remove();
    } else {
      console.log('modifying result', result);
      result?.classList.remove(this.resultClassName);
    }

    const container = this._getContainer();
    container.classList.remove(this.containerClassName);
  }

  // === Styles ===
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

  // === Event Listeners ===
  _addEventListeners(img, lens, zoomedImageModel) {
    const moveLens = this.moveLens.bind(null, zoomedImageModel);

    // execute a function when someone moves the cursor over the image, or the lens
    lens?.addEventListener('mousemove', moveLens);
    img?.addEventListener('mousemove', moveLens);

    // touch screen events
    lens?.addEventListener('touchmove', moveLens);
    img?.addEventListener('touchmove', moveLens);
  }

  _removeEventListeners(img, lens) {
    const moveLens = this.moveLens;
    lens?.removeEventListener('mousemove', moveLens);
    img?.removeEventListener('mousemove', moveLens);

    lens?.removeEventListener('touchmove', moveLens);
    img?.removeEventListener('touchmove', moveLens);
  }
}

export default ZoomedImageController;