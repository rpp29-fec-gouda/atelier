class ZoomedImageModel {
  constructor(img, result, lens) {
    this.img = img;
    this.result = result;
    this.lens = lens;
  }

  getRatioBetweenResultAndLens() {
    const x = this.result.offsetWidth / this.lens.offsetWidth;
    const y = this.result.offsetHeight / this.lens.offsetHeight;

    return {x, y};
  }

  // get lens position bounded by the image
  getLensPosition(cursorPosition) {
    const lens = this.lens;
    const img = this.img;

    let x = cursorPosition.x - (lens.offsetWidth / 2);
    let y = cursorPosition.y - (lens.offsetHeight / 2);

    // Prevent the lens from being positioned outside the image
    if (x < 0) {
      x = 0;
    }
    if (x > img.width - lens.offsetWidth) {
      x = img.width - lens.offsetWidth;
    }

    if (y < 0) {
      y = 0;
    }
    if (y > img.height - lens.offsetHeight) {
      y = img.height - lens.offsetHeight;
    }

    return {x, y};
  }

  // calculate the cursor's x and y coordinates, relative to the image, considerng any page scrolling
  getCursorPosition(e, window) {
    e = e || window.event;

    const imgBounds = this.img.getBoundingClientRect();
    let x = e.pageX - imgBounds.left - window.pageXOffset;
    let y = e.pageY - imgBounds.top - window.pageYOffset;

    return {x, y};
  }
}

export default ZoomedImageModel;
