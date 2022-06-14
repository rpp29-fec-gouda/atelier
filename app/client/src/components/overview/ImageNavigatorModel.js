class ImageNavigatorModel {
  constructor({
    thumbnails = [],
    useIcons = false,
    length = 0,
    maxItems = 7,
    startIndex = 0
  } = {}) {
    this.thumbnails = thumbnails ? thumbnails : [];
    this.useIcons = useIcons;
    this.startIndex = startIndex;
    this.maxItems = maxItems;

    this.length = this._getLength(thumbnails, maxItems, length);
    this.endIndex = this._getEndIndex(startIndex, maxItems, this.length);
  }

  _getEndIndex(startIndex, maxItems, length) {
    return Math.min(startIndex + maxItems - 1, length - 1);
  }

  _getLength(thumbnails, maxItems, length) {
    if (thumbnails && thumbnails.length > 0) {
      return thumbnails.length;
    } else if (length) {
      return length;
    } else {
      return maxItems;
    }
  }

  usePlaceholders() {
    return (!this.useIcons
      && ((this.thumbnails === null
          || this.thumbnails === undefined
          || this.thumbnails.length === 0)
        || (this.thumbnails.length === 1 &&
          (this.thumbnails[0].url === null
          || this.thumbnails[0].url === ''))
      )
    );
  }

  getUseCase() {
    const usePlaceholders = this.usePlaceholders();
    return {
      placeholders: usePlaceholders,
      icons: !usePlaceholders && this.useIcons,
      thumbnails: !usePlaceholders && !this.useIcons && !!this.thumbnails
    };
  }

  getItemChildClass() {
    const useCase = this.getUseCase();
    if (useCase.icons) {
      return 'image-navigator-icon';
    } else if (useCase.thumbnails) {
      return 'image-navigator-thumbnail';
    } else {
      return 'image-navigator-placeholder';
    }
  }

  getItemParentClass() {
    const useCase = this.getUseCase();
    let itemClass = 'image-navigator-item';
    if (useCase.icons) {
      itemClass += ' image-navigator-icon-item';
    }
    return itemClass;
  }

  getItemUrls() {
    const useCase = this.getUseCase();
    if (useCase.thumbnails) {
      // console.log('ImageNavigator thumbnails', thumbnails);
      return this.getThumbnailsSubset();
    } else if (useCase.icons) {
      // console.log('ImageNavigator icons');
      return this.getIconsSubset();
    } else {
      // console.log('ImageNavigator placeholders');
      return this.getPlaceholdersSubset();
    }
  }

  getPlaceholdersSubset() {
    const placeholders = [];
    for (let i = this.startIndex; i <= this.endIndex; i++) {
      placeholders.push(i);
    }
    return placeholders;
  }

  getIconsSubset() {
    const icons = [];
    for (let i = this.startIndex; i <= this.endIndex; i++) {
      icons.push({id: i});
    }
    return icons;
  }

  getThumbnailsSubset() {
    const thumbnailsSubset = [];
    for (let i = this.startIndex; i <= this.endIndex; i++) {
      thumbnailsSubset.push(this.thumbnails[i]);
    }
    return thumbnailsSubset;
  }

  firstIndexNotVisible() {
    return this.startIndex > 0;
  }

  lastIndexNotVisible() {
    return this.endIndex < this.length - 1;
  }

  decrementIndex() {
    if (this.startIndex > 0) {
      this.startIndex = Math.max(0, this.startIndex - this.maxItems);
      this.endIndex = this._getEndIndex(this.startIndex, this.maxItems, this.length);
      return true;
    }
    return false;
  }

  incrementIndex() {
    if (this.endIndex < this.length - 1) {
      this.startIndex = Math.min(this.length - 1, this.startIndex + this.maxItems);
      this.endIndex = this._getEndIndex(this.startIndex, this.maxItems, this.length);
      return true;
    }
    return false;
  }
}

export default ImageNavigatorModel;